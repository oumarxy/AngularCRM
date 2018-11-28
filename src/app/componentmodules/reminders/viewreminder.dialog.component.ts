import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reminder } from '../../appdata/datamodels';
@Component({
	selector: 'app-viewreminder',
	template: `<mat-dialog-content>
					<h5>{{ reminder.reminderTitle }}</h5>
					<p>{{ reminder.reminderDate | dateTime }}<p>
					<p>{{ reminder.reminderDetails }}</p>
				</mat-dialog-content>
				<mat-dialog-actions>
					<button mat-button mat-dialog-close>Close</button>
				</mat-dialog-actions>`,
	styleUrls: [
		'./reminders.component.css'
	]
  })
  export class ViewReminderComponent {
	reminder: Reminder;
	constructor(
	  	public dialogRef: MatDialogRef<ViewReminderComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any) {
			this.reminder = data.reminder;
	}

	onNoClick(): void {
	  this.dialogRef.close();
	}
}
