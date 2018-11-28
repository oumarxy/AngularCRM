import { Injectable } from '@angular/core';
import {
	User, HomeType, LeadSource, LeadStatus,
	SidingType, Referral, RoofType, State,
	DeadLeadReason, PhoneType, Zone, Role,
	TodayActivity, TodayLeadActivity, Insurer
} from '../appdata/datamodels';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PATH, QUERYSIZE } from './services.config';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

/**Reference data converter
 * this function takes all table reference data ids and converts them into values,
 * and converts all values into ids when writing back to the API.
 */
@Injectable()
export class ReferenceDataConverter {
	private initialLoad = true;	// checks for initial load of application.  Avoids calling the cache every time
	// all reference data arrays
	private users: User[] = [];
	private homeTypes: HomeType[] = [];
	private leadSources: LeadSource[] = [];
	private leadStatus: LeadStatus[] = [];
	private sidingTypes: SidingType[] = [];
	private roofTypes: RoofType[] = [];
	private referrals: Referral[] = [];
	private states: State[] = [];
	private deadLeadReasons: DeadLeadReason[] = [];
	private phoneTypes: PhoneType[] = [];
	private roles: Role[] = [];
	private zones: Zone[] = [];
	private todayActivity: TodayActivity[] = [];
	private todayLeadActivity: TodayLeadActivity[] = [];
	private insurers: Insurer[] = [];

	private referenceDataArray = [	// array of reference data arrays.  Used for the map
		this.users, this.homeTypes, this.leadSources, this.leadStatus,
		this.sidingTypes, this.roofTypes, this.referrals, this.states,
		this.deadLeadReasons, this.phoneTypes, this.zones, this.roles,
		this.todayActivity, this.todayLeadActivity, this.insurers
	];

	private referenceDataVariables = [	// list of all reference data variables on objects
		'homeTypeId', 'leadSourceId', 'leadStatusId', 'sidingTypeId',
		'roofTypeId', 'referralId', 'deadLeadReasonId', 'stateId',
		'phone1TypeId', 'phone2TypeId', 'phone3TypeId', 'phone4TypeId',
		'roleId', 'zoneId', 'userId', 'customerStateId', 'mailingStateId',
		'todayActivityId', 'todayLeadActivityId', 'insurerId'
	];
	// Array map that correlates the reference data variables to their respective data arrays
	private idArrayKey = new Map<string, any[]>();
	// Array of reference data calls.   This is called in the forkJoin
	private referenceDataHttpCalls = [
		this.http.get<User[]>(PATH + '/users/search/findByUserAccountEnabled', {
			params: new HttpParams().set('userAccountEnabled', 'true').set('sort', 'userName')
		}),
		this.http.get<LeadSource[]>(PATH + '/leadsources/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'userName')
		}),
		this.http.get<HomeType[]>(PATH + '/hometypes/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<LeadStatus[]>(PATH + '/leadstatuses/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<SidingType[]>(PATH + '/sidingtypes/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<RoofType[]>(PATH + '/rooftypes/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<State[]>(PATH + '/states/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<Referral[]>(PATH + '/referrals/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<DeadLeadReason[]>(PATH + '/deadleadreasons/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<PhoneType[]>(PATH + '/phonetypes/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<Role[]>(PATH + '/roles/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<Zone[]>(PATH + '/zones/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<TodayActivity[]>(PATH + '/todayactivities/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<TodayLeadActivity[]>(PATH + '/todayleadactivities/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		}),
		this.http.get<Insurer[]>(PATH + '/insurers/search/findByDeleted', {
			params: new HttpParams().set('deleted', 'false').set('sort', 'label')
		})
	];

	constructor(private http: HttpClient) {}
	// converts the ids to values
	public convertReferenceIdsToValue(obj: any) {
		if (this.initialLoad) {	// check for initial load
			forkJoin(this.referenceDataHttpCalls).subscribe(results => {	// wait for all API data to return
				this.saveData(results);	// loads all the api data into variables
				this.setMap();	// sets the map values
				this.swapIdsForValues(obj);	// swaps the values
				this.initialLoad = false;	// since data has been loaded into variables, no need to call the API or cache again
			});
		} else {	// if data has already been loaded
			this.swapIdsForValues(obj);	// just swap the values
		}
	}
	// converts the values to ids.  Same as above but reverses the process
	public convertReferenceValuesToId(obj: any) {
		if (this.initialLoad) {
			forkJoin(this.referenceDataHttpCalls).subscribe(results => {
				this.saveData(results);
				this.setMap();
				this.swapValuesForIds(obj);
				this.initialLoad = false;
			});
		} else {
			this.swapValuesForIds(obj);
		}
	}

	// service load.  This is called upon application start to begin loading data before its called
	public loadData(): Observable<boolean> {
		/*forkJoin(this.referenceDataHttpCalls).subscribe(results => {
			this.loadData(results);
		});*/
		return forkJoin(this.referenceDataHttpCalls).map(res => {
			this.saveData(res);
			return true;
		});
	}
	// grabs the results data from the fork join and maps it to the respective arrays
	private saveData(results: any) {
		this.users = results[0]['_embedded']['users'];
		this.leadSources = results[1]['_embedded']['leadsources'];
		this.homeTypes = results[2]['_embedded']['hometypes'];
		this.leadStatus = results[3]['_embedded']['leadstatuses'];
		this.sidingTypes = results[4]['_embedded']['sidingtypes'];
		this.roofTypes = results[5]['_embedded']['rooftypes'];
		this.states = results[6]['_embedded']['states'];
		this.referrals = results[7]['_embedded']['referrals'];
		this.deadLeadReasons = results[8]['_embedded']['deadleadreasons'];
		this.phoneTypes = results[9]['_embedded']['phonetypes'];
		this.roles = results[10]['_embedded']['roles'];
		this.zones = results[11]['_embedded']['zones'];
		this.todayActivity = results[12]['_embedded']['todayactivities'];
		this.todayLeadActivity = results[13]['_embedded']['todayleadactivities'];
		this.insurers = results[14]['_embedded']['insurers'];
	}
	// swaps ids for values
	private swapIdsForValues(obj: any) {
		for (const value of this.referenceDataVariables) { // for each reference data value
			if (Object.prototype.hasOwnProperty.call(obj , value)) { // call the prototype as Javascript has no own-name protection
				if (
					(this.idArrayKey.get(value)).find(x => x.id === obj[value]) !== undefined	// if value is not undefined
				) {
					if (value === 'userId') {
						obj[value] = (this.idArrayKey.get(value)).find(x => x.id === obj[value]).userName;	// swap the id for the value
					} else {
						obj[value] = (this.idArrayKey.get(value)).find(x => x.id === obj[value]).label;	// swap the id for the value
					}
				}
			}
		}
	}

	private swapValuesForIds(obj: any) {	// same as function above, but swaps the value for the id
		for (const value of this.referenceDataVariables) {
			if (Object.prototype.hasOwnProperty.call(obj , value)) {
				if (value === 'userId') {
					if (
						(this.idArrayKey.get(value)).find(x => x.userName === obj[value]) !== undefined
					) {
						obj[value] = (this.idArrayKey.get(value)).find(x => x.userName === obj[value]).id;	// swap the id for the value
					}
				} else {
					if (
						(this.idArrayKey.get(value)).find(x => x.label === obj[value]) !== undefined
					) {
						obj[value] = (this.idArrayKey.get(value)).find(x => x.label === obj[value]).id;
					}
				}
			}
		}
	}
	// sets the map.  This has to be called after the values are loaded or the map arrays will be empty
	private setMap() {
		this.idArrayKey.set(this.referenceDataVariables[0], this.homeTypes);
		this.idArrayKey.set(this.referenceDataVariables[1], this.leadSources);
		this.idArrayKey.set(this.referenceDataVariables[2], this.leadStatus);
		this.idArrayKey.set(this.referenceDataVariables[3], this.sidingTypes);
		this.idArrayKey.set(this.referenceDataVariables[4], this.roofTypes);
		this.idArrayKey.set(this.referenceDataVariables[5], this.referrals);
		this.idArrayKey.set(this.referenceDataVariables[6], this.deadLeadReasons);
		this.idArrayKey.set(this.referenceDataVariables[7], this.states);
		this.idArrayKey.set(this.referenceDataVariables[8], this.phoneTypes);
		this.idArrayKey.set(this.referenceDataVariables[9], this.phoneTypes);
		this.idArrayKey.set(this.referenceDataVariables[10], this.phoneTypes);
		this.idArrayKey.set(this.referenceDataVariables[11], this.phoneTypes);
		this.idArrayKey.set(this.referenceDataVariables[12], this.roles);
		this.idArrayKey.set(this.referenceDataVariables[13], this.zones);
		this.idArrayKey.set(this.referenceDataVariables[14], this.users);
		this.idArrayKey.set(this.referenceDataVariables[15], this.states);
		this.idArrayKey.set(this.referenceDataVariables[16], this.states);
		this.idArrayKey.set(this.referenceDataVariables[17], this.todayActivity);
		this.idArrayKey.set(this.referenceDataVariables[18], this.todayLeadActivity);
		this.idArrayKey.set(this.referenceDataVariables[19], this.insurers);
	}

	// getters for all the reference data.  Values used for application form options
	public getUsers(): User[] {
		return this.users;
	}
	public getHomeTypes(): HomeType[] {
		return this.homeTypes;
	}
	public getLeadSources(): LeadSource[] {
		return this.leadSources;
	}
	public getLeadStatus(): LeadStatus[] {
		return this.leadStatus;
	}
	public getSidingTypes(): SidingType[] {
		return this.sidingTypes;
	}
	public getRoofTypes(): RoofType[] {
		return this.roofTypes;
	}
	public getReferrals(): Referral[] {
		return this.referrals;
	}
	public getStates(): State[] {
		return this.states;
	}
	public getDeadLeadReasons(): DeadLeadReason[] {
		return this.deadLeadReasons;
	}
	public getPhoneTypes(): PhoneType[] {
		return this.phoneTypes;
	}
	public getRoles(): Role[] {
		return this.roles;
	}
	public getZones(): Zone[] {
		return this.zones;
	}
	public getTodayActivity(): TodayActivity[] {
		return this.todayActivity;
	}
	public getTodayLeadActivity(): TodayLeadActivity[] {
		return this.todayLeadActivity;
	}

	public getInsurers(): Insurer[] {
		return this.insurers;
	}

}
