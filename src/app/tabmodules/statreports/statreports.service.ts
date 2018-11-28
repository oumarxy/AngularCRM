
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator } from '@angular/material';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { Observable } from 'rxjs/';
import { UnfilteredInsuranceLead, InsuranceLead } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class StatReportsService {
	constructor(private http: HttpClient, private referenceDataConverter: ReferenceDataConverter ) {}

	getLeadsAfterDate(date: Date): Observable<UnfilteredInsuranceLead[]> {
		return this.http.get<UnfilteredInsuranceLead[]>(PATH + '/insuranceleads/search/findByCreationTimeAfter', {
			params: new HttpParams()
			.set('creationTime', date.toISOString())
		}).map(res => {
			return res;
		});
	}

	getAllHotLeads(): Observable<InsuranceLead[]> {
		return this.http.get<InsuranceLead[]>(PATH + '/insuranceleads/search/findByLeadStatusId', {
			params: new HttpParams()
			.set('size', '1000')
			.set('leadStatusId', '2')
		}).map(res => res);
	}

	getHotLeads(sort: string, size: number, page: number): Observable<InsuranceLead[]> {
		return this.http.get<InsuranceLead[]>(PATH + '/insuranceleads/search/findByLeadStatusId', {
			params: new HttpParams()
			.set('sort', 'creationTime,desc')
			.set('size', size.toString())
			.set('page', page.toString())
			.set('leadStatusId', '2')
		}).map(res => res);
	}

	getLeads(size: string): Observable<UnfilteredInsuranceLead[]> {
		return this.http.get<UnfilteredInsuranceLead[]>(PATH + '/insuranceleads', {
			params: new HttpParams()
			.set('sort', 'creationTime,desc')
			.set('size', size)
		}).map(res => res);
	}

}

export class HotLeadDataSource implements DataSource<InsuranceLead> {
	// Observables for customer data, loading, and filters
	private leadSubject = new BehaviorSubject<InsuranceLead[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	_filterChange = new BehaviorSubject('');

	// filter functions
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }
	// set loading variable
	public loading$ = this.loadingSubject.asObservable();
	renderedData: InsuranceLead[] = [];
	constructor(private leadService: StatReportsService,
				private _paginator: MatPaginator,
				private referenceDataConverter: ReferenceDataConverter) {
					this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
				}

	connect(collectionViewer: CollectionViewer): Observable<InsuranceLead[]> {
		return this.leadSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.leadSubject.complete();
		this.loadingSubject.complete();
	}

	loadLeads(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);

		this.leadService.getHotLeads(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(leads => {
			this._paginator.length = leads['page']['totalElements'];

			this.renderedData = [];
			this.renderedData = leads['_embedded']['insuranceleads'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.leadSubject.next(this.renderedData);
		});

	}
}
