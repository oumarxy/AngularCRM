import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { finalize } from 'rxjs/operators';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { Policy } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';

@Injectable()
export class PolicyService {
	constructor(private http: HttpClient, private referenceDataConverter: ReferenceDataConverter) {
	}

	getPolicies(sort: string, size: number, page: number): Observable<Policy[]> {
		return this.http.get<Policy[]>(PATH + '/policies', {
			params: new HttpParams()
				.set('sort', sort)
				.set('size', size.toString())
				.set('page', page.toString())
		}).map(res => res);
	}

	getPoliciesByUserId(sort: string, size: number, page: number, userId: string): Observable<Policy[]> {
		return this.http.get<Policy[]>(PATH + '/policies/search/findByUserId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('userId', userId)
		}).map(res => res);
	}

	getPoliciesByLeadId(sort: string, size: number, page: number, leadId: string): Observable<Policy[]> {
		return this.http.get<Policy[]>(PATH + '/policies/search/findByLeadId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('leadId', leadId)
		}).map(res => res);
	}

	getPoliciesByCustomerId(sort: string, size: number, page: number, customerId: string): Observable<Policy[]> {
		return this.http.get<Policy[]>(PATH + '/policies/search/findByCustomerId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('customerId', customerId)
		}).map(res => res);
	}

	public createPolicy(policy: Policy) {
		return this.http.post(PATH + '/policies/', policy).map(res => res);
	}

	updatePolicy(policy: Policy) {
		this.referenceDataConverter.convertReferenceValuesToId(policy);
		return this.http.put(PATH + '/policies/' + policy.id, policy).map(res => res);
	}

	deletePolicy(policy: Policy): Observable<Policy> {
		policy.deleted = true;
		return this.http.put<Policy>(PATH + '/policies/' + policy.id, policy).map(res => res);
	}

	getPolicyById(id: string): Observable<Policy> {
		return this.http.get<Policy>(PATH + '/policies/search/findById', {
			params: new HttpParams()
			.set('id', id)
		}).map(res => {
			this.referenceDataConverter.convertReferenceIdsToValue(res);
			return res;
		});
	}
}

export class PolicyDataSource implements DataSource<Policy> {
	// Observables for customer data, loading, and filters
	private policySubject = new BehaviorSubject<Policy[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	// set loading variable
	public loading$ = this.loadingSubject.asObservable();
	renderedData: Policy[] = [];
	// tableRows for the expanded detail row
	tableRows;

	constructor(private policyService: PolicyService,
				private _paginator: MatPaginator,
				private _sort: MatSort,
				private referenceDataConverter: ReferenceDataConverter) {}

	connect(collectionViewer: CollectionViewer): Observable<Policy[]> {
		return this.policySubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.policySubject.complete();
		this.loadingSubject.complete();
	}

	loadPolicies(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);
		this.policyService.getPolicies(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(policies => {
			this._paginator.length = policies['page']['totalElements'];
			this.renderedData = policies['_embedded']['policies'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.policySubject.next(this.renderedData);
		});
	}

	loadPoliciesByUserId(sort: string, size: number, page: number, userId: string) {
		this.loadingSubject.next(true);
		this.policyService.getPoliciesByUserId(sort, size, page, userId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(policies => {
			this._paginator.length = policies['page']['totalElements'];
			this.renderedData = policies['_embedded']['policies'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.policySubject.next(this.renderedData);
		});
	}

	loadPoliciesByLeadId(sort: string, size: number, page: number, leadId: string) {
		this.loadingSubject.next(true);
		this.policyService.getPoliciesByLeadId(sort, size, page, leadId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(policies => {
			this._paginator.length = policies['page']['totalElements'];
			this.renderedData = policies['_embedded']['policies'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.policySubject.next(this.renderedData);
		});
	}

	loadPoliciesByCustomerId(sort: string, size: number, page: number, customerId: string) {
		this.loadingSubject.next(true);
		this.policyService.getPoliciesByCustomerId(sort, size, page, customerId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(policies => {
			this._paginator.length = policies['page']['totalElements'];
			this.renderedData = policies['_embedded']['policies'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.policySubject.next(this.renderedData);
		});
	}
}

