import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { CustomerService } from '../customer.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { DuplicateService } from './resolveduplicate.service';
// import { MDL } from 'material-design-lite';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CustomerEmail, Customer } from '../../../appdata/datamodels';
@Component({
	selector: 'app-duplicateresolution',
	styleUrls: [
		'./resolveduplicate.component.css'
	],
	templateUrl: './resolveduplicate.component.html',
})
export class DuplicateResolutionComponent implements OnInit {
	duplicatesList: any[] = [];
	duplicateEmailList: CustomerEmail[];
	customer: Customer;
	customer2: Customer;
	resultsLength;
	isLoadingResults = true;
	searchIndex = 0;
	constructor(
		public dialogRef: MatDialogRef<DuplicateResolutionComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,
		private duplicateService: DuplicateService,
		// private customerService: CustomerService
	) {}

	ngOnInit() {
		this.loadDuplicates();
	}

	loadDuplicates() {	// load all duplicate files
		// fetch the original file from the id on the selected customer
		const originalFile = this.duplicateService.getCustomerByDuplicateId(this.data.rowInfo);
		// load all duplicate files related to the original file
		const List = this.duplicateService.loadDuplicates(this.data.rowInfo);

		forkJoin([originalFile, List]).pipe(
			catchError(() => of([])),
		).subscribe(results => {
			this.customer = results[0];
			this.duplicatesList = results[1]['_embedded']['customers'];
			this.customer2 = this.duplicatesList[this.searchIndex];
		});
	}


	finished() {
	}

	forward() {
		this.searchIndex++;
		if (this.searchIndex >= this.duplicatesList.length) {
			this.searchIndex = 0;
			this.customer2 = this.duplicatesList[this.searchIndex];
		} else {
			this.customer2 = this.duplicatesList[this.searchIndex];
		}
	}

	back() {
		this.searchIndex--;
		if (this.searchIndex < 0) {
			this.searchIndex = (this.duplicatesList.length - 1);
			this.customer2 = this.duplicatesList[this.searchIndex];
		} else {
			this.customer2 = this.duplicatesList[this.searchIndex];
		}
	}

	mergeDuplicate() { // merge the original customer fields over the duplicate customer
		this.duplicateService.merge(this.customer2, this.customer);
		this.duplicatesList.splice(this.searchIndex, 1);

		// customer is being reset before the above services complete.  need to hook this up to observable or pass to services file
		if (this.duplicatesList.length === 0) {
			this.customer2 = new Customer();
		} else {
			this.customer2 = this.duplicatesList[this.searchIndex];
		}
	}

	markDuplicateAsUnique() {	// mark the duplicate as a unique customer
		this.customer2.possibleDuplicate = false;
		// this.customerService.updateCustomer(this.customer2);
		// remove from duplicate list
		this.duplicatesList.splice(this.searchIndex, 1);
		if (this.duplicatesList.length === 0) {
			this.customer2 = new Customer();
		} else {
			this.customer2 = this.duplicatesList[this.searchIndex];
		}
	}
}
