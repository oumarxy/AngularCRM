import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PolicyService } from './policy.service';

@Component({ // Delete component
	selector: 'app-deletepolicy',
	template: `<h2 mat-dialog-title>Delete this policy?</h2>
				<mat-dialog-content>Are you sure? <b>This action cannot be undone!</b>
					<mat-form-field class="example-full-width">
						<textarea matInput placeholder="Reason for deletion" id="reason" [(ngModel)]="reason" name="reason"></textarea>
						<mat-hint align="start"><strong>Required</strong> </mat-hint>
					</mat-form-field>
				</mat-dialog-content>
				<mat-dialog-actions>
					<button mat-button mat-dialog-close>No</button>
					<!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
					<button mat-button [mat-dialog-close]="true" (click)="deletePolicy()" type="submit" color="warn">Yes</button>
				</mat-dialog-actions>`,
	styleUrls: []
  })
  export class PolicyDeleteComponent {
	// deletion reason
	reason;
	constructor(
		public dialogRef: MatDialogRef<PolicyDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private policyService: PolicyService) {
			this.reason = '';
		}

	deletePolicy() {
		// for each selection in array, delete it
		this.policyService.deletePolicy(this.data.policy).subscribe(res => {
		});
		// create notes associated with deleted lead(s)
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
