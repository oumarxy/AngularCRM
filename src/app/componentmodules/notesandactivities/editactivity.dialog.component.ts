import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodayLeadActivity, TodayActivity } from '../../appdata/datamodels';
import { TodayLeadActivityService } from './notesactivities.service';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';

@Component({ // Edit User component
	selector: 'app-editactivity',
	template: `<h2 mat-dialog-title>Edit Activity</h2>
				<mat-dialog-content>
					<div class="example-container">
						<form #editActivityForm="ngForm">
							<mat-form-field hintLabel="Activity" class="notefield">
								<mat-select
									placeholder="{{ activity.todayActivityId}} "
									id="todayActivityId"
									[(ngModel)]="activity.todayActivityId"
									name="todayActivityId">
									<mat-option *ngFor="let activity of activities" [value]="activity.id">{{ activity.label }}</mat-option>
								</mat-select>
							</mat-form-field>
						</form>
					</div>
				</mat-dialog-content>
				<mat-dialog-actions>
					<button mat-button mat-dialog-close>Cancel</button>
					<button mat-button [mat-dialog-close]="true" (click)="submitEdits()">Save Changes</button>
				</mat-dialog-actions>`,
	styleUrls: [
	]
  })
  export class EditActivityComponent {
	activity: TodayLeadActivity;
	activities: TodayActivity[];

	constructor(
	  	public dialogRef: MatDialogRef<EditActivityComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private activityService: TodayLeadActivityService,
		private referenceDataConverter: ReferenceDataConverter) {
			this.activity = this.data.activity;
			this.activities = this.referenceDataConverter.getTodayActivity();

		}

	onNoClick(): void {
	  this.dialogRef.close();
	}

	submitEdits() {
		this.activityService.editTodayLeadActivity(this.activity).subscribe(res => res);
	}
}
