import { Component, Inject } from '@angular/core';
import { CustomerEmail } from '../../appdata/datamodels';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmailAddressService } from './emailaddresses.service';

// Edit User component
@Component({
	selector: 'app-editemail',
	template: `<h2 mat-dialog-title>Edit Selection</h2>
	<mat-dialog-content>Edit fields and then click on save</mat-dialog-content>
	<div class="example-container">
		<form #editEmailAddressForm="ngForm">
			<mat-form-field hintLabel="Email Address">
				<input matInput placeholder="{{ email.emailAddress }}" id="email" [(ngModel)]="email.emailAddress" name="email">
			</mat-form-field>
		</form>
	</div>
	<mat-dialog-actions>
		<button mat-button mat-dialog-close>Cancel</button>
		<!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
		<button mat-button [mat-dialog-close]="true" (click)="submitEdits()">Save Changes</button>
	</mat-dialog-actions>`,
	styleUrls: [
		'./emailaddress.component.css'
	]
  })
  export class EmailAddressEditComponent {
	email: CustomerEmail;
	constructor(
	  	public dialogRef: MatDialogRef<EmailAddressEditComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private emailService: EmailAddressService) {
			this.email = data.customerEmail;
	}
	submitEdits() {
		this.emailService.editEmail(this.email);
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
