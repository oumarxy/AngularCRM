import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../datatable.service';

@Component({ // Edit User component
	selector: 'app-editlead',
	templateUrl: './edit.dialog.component.html',
	styleUrls: []
  })
  export class EditComponent {
	// array of changes.  This is a generic JSON array.  You do not pass an object here
	// Edit function uses a PATCH instead of a PUT.  According to RFC 7000-something, for updating a field you only pass what you need
	changes: any = {};
	// Form control on email was removed.  Left it here in case it is added back
	email = new FormControl('', [Validators.required, Validators.email]);
	constructor(
	  	public dialogRef: MatDialogRef<EditComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dataService: DataService) {
		}

	onNoClick(): void {
	  this.dialogRef.close();
	}
	// call API service edit function
	edit() {
		// merge objects (use this for a PUT call)
		// Object.assign(this.editInsuranceLead, this.insuranceLead);  // merges new user to old user and maps over old fields
		// call the updateUser service.  Passes the changes array and the id of the user to be edited
		// this.dataService.updateData(this.editInsuranceLead);
	}

	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}
}
