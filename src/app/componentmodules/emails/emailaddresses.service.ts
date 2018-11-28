import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerEmail } from '../../appdata/datamodels';
import { Observable } from 'rxjs/Observable';
import { PATH } from '../../services/services.config';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/';
import { MatPaginator } from '@angular/material';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EmailAddressService {
	constructor(
		private http: HttpClient,
		// private referenceDataConverter: ReferenceDataConverter,
	) {}

	public getEmails(sort: string, size: number, page: number): Observable<CustomerEmail[]> {
		return this.http.get<CustomerEmail[]>(PATH + '/customeremailaddresses', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public getEmailsByCustomerId(sort: string, size: number, page: number, customerId: string): Observable<CustomerEmail[]> {
		return this.http.get<CustomerEmail[]>(PATH + '/customeremailaddresses/search/findByCustomerId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('customerId', customerId)
		}).map(res => res);
	}

	public addEmail(email: CustomerEmail): Observable<CustomerEmail> {
		return this.http.post<CustomerEmail>(PATH + '/customeremailaddresses/', email)
		.map(res => res);
	}

	public editEmail(email: CustomerEmail): Observable<CustomerEmail> {
		return this.http.put<CustomerEmail>(PATH + '/customeremailaddresses/' + email.id, email)
		.map(res => res);
	}

	public deleteEmail(email: CustomerEmail): Observable<CustomerEmail> {
		return this.http.delete<CustomerEmail>(PATH + '/customeremailaddresses/' + email.id)
		.map(res =>  res);
	}
}

export class EmailAddressDataSource implements DataSource<CustomerEmail> {
	// Observables for customer data, loading, and filters
	private customerEmailSubject = new BehaviorSubject<CustomerEmail[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	// set loading variable
	public loading$ = this.loadingSubject.asObservable();

	constructor(private emailRepoService: EmailAddressService,
				private _paginator: MatPaginator) {}

	connect(collectionViewer: CollectionViewer): Observable<CustomerEmail[]> {
		return this.customerEmailSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.customerEmailSubject.complete();
		this.loadingSubject.complete();
	}

	loadEmails(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);

		this.emailRepoService.getEmails(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(emails => {
			this._paginator.length = emails['page']['totalElements'];
			this.customerEmailSubject.next(emails['_embedded']['customeremailaddresses']);
		});
	}

	loadEmailsByCustomerId(sort: string, size: number, page: number, customerId: string) {
		this.loadingSubject.next(true);

		this.emailRepoService.getEmailsByCustomerId(sort, size, page, customerId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(emails => {
			this._paginator.length = emails['page']['totalElements'];
			this.customerEmailSubject.next(emails['_embedded']['customeremailaddresses']);
		});
	}
}
