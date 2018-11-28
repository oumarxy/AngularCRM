import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
/// import { CustomerService } from '../customer.service';
import { Customer, Policy, CustomerEmail, InsuranceLead } from '../../../appdata/datamodels';
import { PATH } from '../../../services/services.config';

@Injectable()
export class DuplicateService {
	constructor(private http: HttpClient,
				// private customerService: CustomerService
				) {}


	getCustomerById(customer: Customer): Observable<Customer> {
		return this.http.get<Customer>(PATH + '/customers/' + customer.id).map(res => {
			return res;
		});
	}

	getCustomerByDuplicateId(customer: Customer): Observable<Customer> {
		return this.http.get<Customer>(PATH + '/customers/' + customer.duplicateCustomerId).map(res => {
			return res;
		});
	}

	loadDuplicates(customer: Customer): Observable<Customer[]> {
		return this.http.get<Customer[]>(PATH + '/customers/search/findByDuplicateCustomerId', {
			params: new HttpParams()
			.set('duplicateCustomerId', customer.duplicateCustomerId)
		}).map(res => {
			return res;
		});
	}

	findPoliciesByCustomerId(customer: Customer): Observable<Policy[]> {
		return this.http.get<Policy[]>(PATH + '/policies/search/findByCustomerId', {
			params: new HttpParams()
			.set('customerId', customer.id)
		}).map(res => {
			return res['_embedded']['policies'];
		}, err => {
		});
	}

	findEmailsByCustomerId(customer: Customer): Observable<CustomerEmail[]> {
		return this.http.get<CustomerEmail[]>(PATH + '/customeremailaddresses/search/findByCustomerId', {
			params: new HttpParams()
			.set('customerId', customer.id)
		}).map(res => res['_embedded']['customeremailaddresses']);
	}
	findInsuranceLeadsByCustomerId(customer: Customer): Observable<InsuranceLead[]> {
		return this.http.get<InsuranceLead[]>(PATH + '/insuranceleads/search/findByCustomerId', {
			params: new HttpParams()
			.set('customerId', customer.id)
		}).map(res => res['_embedded']['insuranceleads']);
	}

	merge(customer: Customer, customer2: Customer) {
		// grab all records from target customer

		const policies = this.findPoliciesByCustomerId(customer);
		const emails = this.findEmailsByCustomerId(customer);
		const leads = this.findInsuranceLeadsByCustomerId(customer);

		forkJoin([policies, emails, leads]).subscribe(results => {
			results[0].forEach(x => {
				x.customerId = customer2.id;
				this.http.put(PATH + '/policies/' + x.id, x).subscribe(res => {
				});
			});
			results[1].forEach(x => {
				x.customerId = customer2.id;
				this.http.put(PATH + '/customeremailaddresses/' + x.id, x).subscribe(res => {
				}, err => {
				});
			});
			results[2].forEach(x => {
				x.customerId = customer2.id;
				this.http.put(PATH + '/insuranceleads/' + x.id, x).subscribe(res => {
				}, err => {
				});
			});

			// save merging customer so old record can be deleted
			const oldCustomerId = customer.id;
			// maps the second argument over the first
			customer2 = Object.assign(customer, customer2);
			customer2.possibleDuplicate = false;
			// update customer
			// this.customerService.updateCustomer(customer2);
			// delete old customer
			const oldCustomer = new Customer();
			oldCustomer.id = oldCustomerId;
			// this.customerService.deleteCustomer(oldCustomer);
		});
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

