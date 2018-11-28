import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { finalize } from 'rxjs/operators';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { UnfilteredInsuranceLead, Customer, CustomerEmail, Policy, FileStoreDocument, InsuranceLead, Note } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';
import { MatPaginator, MatSort } from '@angular/material';


@Injectable()
export class LeadService {
	constructor(private http: HttpClient, private referenceDataConverter: ReferenceDataConverter ) {}

	getLeads(sort: string, size: number, page: number, filter: any): Observable<InsuranceLead[]> {
		return this.http.get<InsuranceLead[]>(PATH + '/insurancefilteredleads', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('filters', filter)
		}).map(res => res);
	}

	getMyLeads(sort: string, size: number, page: number, filter: any): Observable<InsuranceLead[]> {
		// for my leads, the userID will always be passed as a filter
		const obj = JSON.parse(filter);
		obj['insuranceLead']['userId'] = JSON.parse(localStorage.getItem('user')).id;
		filter = JSON.stringify(obj);
		return this.http.get<InsuranceLead[]>(PATH + '/insurancefilteredleads', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('filters', filter)
		}).map(res => res);
	}

	getLeadById(id: string): Observable<UnfilteredInsuranceLead> {
		return this.http.get<UnfilteredInsuranceLead>(PATH + '/insuranceleads/search/findById', {
			params: new HttpParams()
			.set('id', id)
		}).map(res => {
			this.referenceDataConverter.convertReferenceIdsToValue(res);
			return res;
		});
	}

	getLeadsByCustomerId(id: string, page: number): Observable<UnfilteredInsuranceLead[]> {
		return this.http.get<UnfilteredInsuranceLead[]>(PATH + '/insuranceleads/search/findByCustomerId', {
			params: new HttpParams()
			.set('page', page.toString())
			.set('customerId', id)
		}).map(res => res);
	}

	getCustomerById(id: string): Observable<Customer> {
		return this.http.get<Customer>(PATH + '/customers/search/findById', {
			params: new HttpParams()
			.set('id', id)
		}).map(res => res);
	}

	getEmailsByCustomerId(id: string): Observable<CustomerEmail[]> {
		return this.http.get<CustomerEmail[]>(PATH + '/customeremailaddresses/search/findByCustomerId', {
			params: new HttpParams()
			.set('customerId', id)
		}).map(res => res);
	}

	getPolicyByLeadId(id: string): Observable<Policy[]> {
		return this.http.get<Policy[]>(PATH + '/policies/search/findByLeadId', {
			params: new HttpParams()
			.set('leadId', id)
		}).map(res => res);
	}

	getDocumentsByInsuranceLeadId(id: string): Observable<FileStoreDocument[]> {
		return this.http.get<FileStoreDocument[]>(PATH + '/storedfiles/search/findByInsuranceLeadId', {
			params: new HttpParams()
			.set('insuranceLeadId', id)
		}).map(res => res);
	}

	// pass in a customer object and/or email object as well
	public addLead(lead: InsuranceLead) {
		this.referenceDataConverter.convertReferenceValuesToId(lead);
		this.http.post(PATH + '/insuranceleads', lead).map(res => res);
	}

	public addLeadAndCustomer(lead: any): Observable<any> {
		this.referenceDataConverter.convertReferenceValuesToId(lead);
		return this.http.post<any>(
			PATH + '/insuranceleads/add',
			lead, {observe: 'response'}
		).map(res => res );
	}

	public deleteLead(lead: InsuranceLead) {
		this.referenceDataConverter.convertReferenceValuesToId(lead);
		lead.deleted = true;
		lead.modificationTime = new Date();
		return this.http.put<UnfilteredInsuranceLead>(PATH + '/insuranceleads/' + lead.id, lead)
		.map(res => res)
		.catch(err => Observable.of(err));
	}

	public deleteLeadAdmin(lead: InsuranceLead): Observable<InsuranceLead> {
		return this.http.delete<InsuranceLead>(PATH + '/insuranceleads/' + lead.id).map(res => res);
	}

	public updateLead(lead: UnfilteredInsuranceLead): Observable<UnfilteredInsuranceLead> {
		this.referenceDataConverter.convertReferenceValuesToId(lead);
		lead.modificationTime = new Date();
		return this.http.put<UnfilteredInsuranceLead>(PATH + '/insuranceleads/' + lead.id, lead)
		.map(res => res)
		.catch(err => Observable.of(err));
	}

	public updateLeadLastContact(lead: InsuranceLead) {
		this.referenceDataConverter.convertReferenceValuesToId(lead);
		lead.lastContactDate = new Date();
		return this.http.put(PATH + '/insuranceleads/' + lead.id, lead).subscribe(res => {
		}, err => {
		});
	}
}

export class LeadDataSource implements DataSource<InsuranceLead> {
	// Observables for customer data, loading, and filters
	private leadSubject = new BehaviorSubject<InsuranceLead[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	// set loading variable
	public loading$ = this.loadingSubject.asObservable();
	// the data to be rendered, filtered
	renderedData: InsuranceLead[] = [];

	constructor(private leadService: LeadService,
				private _paginator: MatPaginator,
				private _sort: MatSort,
				private referenceDataConverter: ReferenceDataConverter ) {}

	connect(collectionViewer: CollectionViewer): Observable<InsuranceLead[]> {
		return this.leadSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.leadSubject.complete();
		this.loadingSubject.complete();
	}

	loadLeads(sort: string, size: number, page: number, filter: string) {
		this.loadingSubject.next(true);

		this.leadService.getLeads(sort, size, page, filter).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(leads => {
			this._paginator.length = leads['page']['totalElements'];
			this.renderedData = leads['iflList'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.leadSubject.next(this.renderedData);
		});
	}

	loadMyLeads(sort: string, size: number, page: number, filter: string) {
		this.loadingSubject.next(true);

		this.leadService.getMyLeads(sort, size, page, filter).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(leads => {
			this._paginator.length = leads['page']['totalElements'];
			this.renderedData = leads['iflList'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.leadSubject.next(this.renderedData);
		});
	}

	loadCustomerLeads(customerId: string, page: number) {
		this.loadingSubject.next(true);

		this.leadService.getLeadsByCustomerId(customerId, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(leads => {
			this._paginator.length = leads['page']['totalElements'];
			this.renderedData = leads['_embedded']['insuranceleads'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.leadSubject.next(this.renderedData);
		});
	}
}
