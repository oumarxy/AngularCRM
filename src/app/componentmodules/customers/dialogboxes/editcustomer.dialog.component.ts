import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';
import { Customer } from '../../../appdata/datamodels';
import { CustomerService } from '../customer.service';

@Component({ // Edit User component
	selector: 'app-editcustomer',
	templateUrl: './editcustomer.dialog.component.html',
	styleUrls: [
		'../../leads/dialogboxes/dialog.component.css'
	]
})
export class EditCustomerComponent {
	customer: Customer;
	phoneTypes: String[];
	states: String[];
	changes: any = {};
	constructor(
	  	public dialogRef: MatDialogRef<EditCustomerComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private customerService: CustomerService,
		private referenceDataConverter: ReferenceDataConverter) {
			// this.customer = new Customer();	// new user created in the event of a PUT
			this.phoneTypes = [];
			this.states = [];
			this.customer = data.customer;
			this.referenceDataConverter.getPhoneTypes().forEach(phoneType => {
				this.phoneTypes.push(phoneType.label);
			});
			this.referenceDataConverter.getStates().forEach(state => {
				this.states.push(state.label);
			});
		}

	onNoClick(): void {
	  this.dialogRef.close();
	}
	// call API service edit function
	submitEdits() {
		// call the updateUser service.  Passes the changes array and the id of the user to be edited
		this.customerService.updateCustomer(this.customer).subscribe(res => res);
	}
}
