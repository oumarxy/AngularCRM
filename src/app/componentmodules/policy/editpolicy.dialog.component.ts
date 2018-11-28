import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PolicyService } from './policy.service';
import { Policy, User, Insurer } from '../../appdata/datamodels';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';

@Component({ // Edit User component
	selector: 'app-editpolicy',
	templateUrl: './editpolicy.dialog.component.html',
	styleUrls: []
  })
  export class PolicyEditComponent {
	// editPolicy: Policy;
	policy: Policy;
	users: User[];
	insurers: String[];

	// array of changes.  This is a generic JSON array.  You do not pass an object here
	// Edit function uses a PATCH instead of a PUT.  According to RFC 7000-something, for updating a field you only pass what you need
	changes: any = {};
	// Form control on email was removed.  Left it here in case it is added back
	email = new FormControl('', [Validators.required, Validators.email]);
	constructor(
	  	public dialogRef: MatDialogRef<PolicyEditComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private referenceDataConverter: ReferenceDataConverter,
		private policyService: PolicyService) {
			this.insurers = [];
			this.referenceDataConverter.getInsurers().forEach(insurer => {
				this.insurers.push(insurer.label);
			});
			this.policy = data.policy;
		}

	onNoClick(): void {
	  this.dialogRef.close();
	}
	submitEdits() {
		this.policyService.updatePolicy(this.policy).subscribe(res => res);
	}

	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}
}
