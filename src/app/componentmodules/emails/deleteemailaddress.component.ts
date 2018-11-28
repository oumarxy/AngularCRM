import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmailAddressService } from './emailaddresses.service';

// Delete component
@Component({
	selector: 'app-deleteemail',
	template: `<h2 mat-dialog-title>Delete selected item(s)?</h2>
	<mat-dialog-content>Are you sure?</mat-dialog-content>
	<mat-dialog-actions>
	  <button mat-button mat-dialog-close>No</button>
	  <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
	  <button mat-button [mat-dialog-close]="true" (click)="deleteUsers()" type="submit" color="warn">Yes</button>
	</mat-dialog-actions>`,
	styleUrls: [
		'./emailaddress.component.css'
	]
  })
  export class EmailAddressDeleteComponent {
	constructor(
		public dialogRef: MatDialogRef<EmailAddressDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private emailService: EmailAddressService) {
		}

	deleteUsers() {
		this.emailService.deleteEmail(this.data.customerEmail).subscribe(response => {
		});
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}

}
