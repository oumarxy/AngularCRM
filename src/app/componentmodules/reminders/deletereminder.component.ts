import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReminderService } from './reminders.service';

// Delete component
@Component({
	selector: 'app-deletereminder',
	template: `<h2 mat-dialog-title>Delete selected item(s)?</h2>
	<mat-dialog-content>Are you sure?</mat-dialog-content>
	<mat-dialog-actions>
	  <button mat-button mat-dialog-close>No</button>
	  <button mat-button [mat-dialog-close]="true" (click)="delete()" type="submit" color="warn">Yes</button>
	</mat-dialog-actions>`,
	styleUrls: [
		'./reminders.component.css'
	]
  })
  export class DeleteReminderComponent {
	constructor(
		public dialogRef: MatDialogRef<DeleteReminderComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private reminderService: ReminderService) {}

	delete() {
		this.reminderService.deleteReminder(this.data.reminder).subscribe( res => res);
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}

}
