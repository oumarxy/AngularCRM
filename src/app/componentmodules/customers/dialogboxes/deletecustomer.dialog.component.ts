import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { CustomerService } from '../customer.service';
import { Note } from '../../../appdata/datamodels';
import { LeadService } from '../../leads/lead.service';

@Component({ // Delete component
	selector: 'app-deletecustomer',
	templateUrl: './deletecustomer.dialog.component.html',
})
export class DeleteCustomerComponent {
	refdata = 'Customer';
	// deletion reason
	note: Note;
	constructor(
		public dialogRef: MatDialogRef<DeleteCustomerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		// private customerService: CustomerService,
		private leadService: LeadService) {
			this.note = new Note();
		}

	deleteCustomer() {
		this.note.userId = JSON.parse(localStorage.getItem('user')).id;
		// this.customerService.deleteCustomer(this.data.customer);
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
