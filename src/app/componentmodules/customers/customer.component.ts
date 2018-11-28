import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Customer, InsuranceLead } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { EditCustomerComponent } from './dialogboxes/editcustomer.dialog.component';
import { CustomerService } from './customer.service';

@Component({
	selector: 'app-customerdetail',
	styleUrls: [
		'./css/customer.component.css'
	],
	templateUrl: './templates/customer.component.html'
})
export class CustomerComponent implements OnInit, AfterViewInit {
	@Input() lead: InsuranceLead;
	customer: Customer;	// selected customer
	isLoaded = false;	// is data loaded?
	path = PATH;

	constructor(
		private route: ActivatedRoute,
		private customerService: CustomerService,
		private referenceDataConverter: ReferenceDataConverter,
		public dialog: MatDialog
	) {
		this.customer = new Customer();
	}

	ngOnInit() {
		this.loadCustomer();
	}

	ngAfterViewInit() {}


	loadCustomer() {
		this.customerService.getCustomerById(this.lead.customerId).subscribe(result => {
			this.referenceDataConverter.convertReferenceIdsToValue(result);
			this.customer = result;
		});
	}


	editCustomer() {
		const dialogRef = this.dialog.open(EditCustomerComponent, {
			data: {
				'customer': this.customer
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadCustomer();
		});
	}
}
