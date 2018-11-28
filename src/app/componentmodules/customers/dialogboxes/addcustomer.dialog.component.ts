import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { CustomerService } from '../customer.service';
import { Customer } from '../../../appdata/datamodels';

// Add dialog box
@Component({
	selector: 'app-addcustomer',
	templateUrl: './addcustomer.dialog.component.html',
	styleUrls: [
		'../css/customer.component.css'
	]
})
export class AddCustomerComponent {
	refdata = 'Customer'; // Title for dialog box
	newCustomer: Customer;

	constructor(
		public dialogRef: MatDialogRef<AddCustomerComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
			// private customerService: CustomerService
		) {	// API service for adding users
			this.newCustomer = new Customer();
		}
	addCustomer() { // submit user function.  Calls the api service and passes the User object to the call
		// this.userapiservice.addUser(this.user);
	}
	onNoClick(): void { // closes dialog window if clicked outside box
	  this.dialogRef.close();
	}
}
