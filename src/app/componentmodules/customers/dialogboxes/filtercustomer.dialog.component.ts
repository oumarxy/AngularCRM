import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { CustomerService } from '../customer.service';
import { InsuranceLead, User, HomeType, LeadSource, LeadStatus, SidingType, RoofType } from '../../../appdata/datamodels';

// Add dialog box
@Component({
	selector: 'app-customerfilters',
	templateUrl: './filtercustomer.dialog.component.html',
	styleUrls: [
		'../css/customer.component.css'
	]
})
export class CustomerFilterComponent {
	refdata = 'Lead'; // Title for dialog box
	@Output() filterEvent = new EventEmitter(); // event emitter to send back to parent
	// filter format
	customerFilters: any = {};
	insuranceLeadFilters: any = {};
	emailAddress: any;
	filterList: any = {};
	// reference data loads
	insuranceleads: InsuranceLead[];
	users: User[];
	homeTypes: HomeType[];
	leadSources: LeadSource[];
	leadStatus: LeadStatus[];
	sidingTypes: SidingType[];
	roofTypes: RoofType[];
	constructor(
		public dialogRef: MatDialogRef<CustomerFilterComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		// private customerService: CustomerService
	) {}
	addFilters() { // submit user function.  Calls the api service and passes the User object to the call
		const filters = {
			'customer' : this.customerFilters,
			'insuranceLead': this.insuranceLeadFilters,
			'emailAddress': this.emailAddress };
		this.filterEvent.emit(filters);	// pass filters back up to parent
	}
	onNoClick(): void { // closes dialog window if clicked outside box
	  this.dialogRef.close();
	}
}
