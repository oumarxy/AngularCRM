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
import { Customer, CustomerEmail } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';

@Injectable()
export class CustomerService {
	constructor(
		private http: HttpClient,
		private referenceDataConverter: ReferenceDataConverter
	) {}

	getCustomers(sort: string, size: number, page: number): Observable<Customer[]> {
		return this.http.get<Customer[]>(PATH + '/customers', {
			params: new HttpParams()
				.set('sort', sort)
				.set('size', size.toString())
				.set('page', page.toString())
		}).map(res => res);
	}

	getCustomerById(id: string): Observable<Customer> {
		return this.http.get<Customer>(PATH + '/customers/search/findById', {
			params: new HttpParams()
				.set('id', id)
		}).map(res => {
			this.referenceDataConverter.convertReferenceIdsToValue(res);
			return res;
		});
	}

	/*deleteCustomer(customer: Customer): Observable<Customer> {
		// return this.http.delete<Customer>(PATH + '/customers/' + customer.id).map(res => res);
	}*/

	updateCustomer(customer: Customer): Observable<Customer> {
		this.referenceDataConverter.convertReferenceValuesToId(customer);
		return this.http.put<Customer>(PATH + '/customers/' + customer.id, customer).map(res => res);
	}

	getCustomersByFirstName(sort: string, size: number, page: number, firstName: string): Observable<Customer[]> {
		return this.http.get<Customer[]>(PATH + '/customers/search/findByFirstName', {
			params: new HttpParams()
				.set('sort', sort)
				.set('size', size.toString())
				.set('page', page.toString())
				.set('firstName', firstName)
		}).map(res => res);
	}

	getCustomersByLastName(sort: string, size: number, page: number, lastName: string): Observable<Customer[]> {
		return this.http.get<Customer[]>(PATH + '/customers/search/findByLastName', {
			params: new HttpParams()
				.set('sort', sort)
				.set('size', size.toString())
				.set('page', page.toString())
				.set('lastName', lastName)
		}).map(res => res);
	}

	getCustomersByDuplicates(sort: string, size: number, page: number): Observable<Customer[]> {
		return this.http.get<Customer[]>(PATH + '/customers/search/findByPossibleDuplicate', {
			params: new HttpParams()
				.set('sort', sort)
				.set('size', size.toString())
				.set('page', page.toString())
				.set('possibleDuplicate', 'true')
		}).map(res => res);
	}

	getCustomerEmail(customer: Customer): Observable<Customer[]> {
		return this.http.get<Customer[]>(PATH + '/customeremailaddresses/search/findByCustomerId', {
			params: new HttpParams()
			.set('customerId', customer.id)
		}).map(res => res);
	}

	getCustomerIdsByEmail(customerEmail: string): Observable<CustomerEmail[]> {
		return this.http.get<CustomerEmail[]>(PATH + '/customeremailaddresses/search/findByEmailAddress', {
			params: new HttpParams()
			.set('emailAddress', customerEmail)
		}).map(res => res);
	}
}

export class CustomerDataSource implements DataSource<Customer> {
	// Observables for customer data, loading, and filters
	private customerSubject = new BehaviorSubject<Customer[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	_filterChange = new BehaviorSubject('');

	// filter functions
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }
	// set loading variable
	public loading$ = this.loadingSubject.asObservable();

	// the data to be rendered, filtered
	renderedData: Customer[] = [];

	constructor(private customerService: CustomerService,
				private _paginator: MatPaginator,
				private _sort: MatSort,
				private referenceDataConverter: ReferenceDataConverter) {
					this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
				}

	connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
		return this.customerSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.customerSubject.complete();
		this.loadingSubject.complete();
	}

	loadCustomers(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);
		this.customerService.getCustomers(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(customers => {
			this._paginator.length = customers['page']['totalElements'];
			this.renderedData = customers['_embedded']['customers'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.customerSubject.next(this.renderedData);
		});
	}

	loadCustomersByFirstName(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);
		if (this.filter === '') {
			this.loadCustomers(sort, size, page);
		} else {
			this.customerService.getCustomersByFirstName(sort, size, page, this.filter).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			).subscribe(customers => {
				this._paginator.length = customers['_embedded']['customers'].length;
				this.renderedData = customers['_embedded']['customers'];
				this.renderedData.forEach(element => {
					this.referenceDataConverter.convertReferenceIdsToValue(element);
				});
				this.customerSubject.next(this.renderedData);
			});
		}
	}

	loadCustomersByLastName(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);
		if (this.filter === '') {
			this.loadCustomers(sort, size, page);
		} else {
			this.customerService.getCustomersByLastName(sort, size, page, this.filter).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			).subscribe(customers => {
				this._paginator.length = customers['_embedded']['customers'].length;
				this.renderedData = customers['_embedded']['customers'];
				this.renderedData.forEach(element => {
					this.referenceDataConverter.convertReferenceIdsToValue(element);
				});
				this.customerSubject.next(this.renderedData);
			});
		}
	}

	loadCustomersByEmail(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);
		if (this.filter === '') {
			this.loadCustomers(sort, size, page);
		} else {
			this.customerService.getCustomerIdsByEmail(this.filter).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			).subscribe(customeremailaddresses => {
				this.renderedData = [];
				const customerEmail = customeremailaddresses['_embedded']['customeremailaddresses'][0];
				if (customerEmail !== undefined) {
					this._paginator.length = customeremailaddresses['_embedded']['customeremailaddresses'].length;

					this.customerService.getCustomerById(customerEmail.customerId).subscribe(customer => {
						this.renderedData.push(customer);
						this.renderedData.forEach(element => {
							this.referenceDataConverter.convertReferenceIdsToValue(element);
						});
						this.customerSubject.next(this.renderedData);
					});
				} else {
					this.customerSubject.next(this.renderedData);
				}
			});
		}
	}

	loadDuplicates(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);
		this.customerService.getCustomersByDuplicates(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(customers => {
			this._paginator.length = customers['_embedded']['customers'].length;
			this.renderedData = customers['_embedded']['customers'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.customerSubject.next(this.renderedData);
		});
	}
}

