import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reminder } from '../../appdata/datamodels';
import { ReminderService } from './reminders.service';
import { HOURS, MINUTES, CYCLES, TimeInput } from './addreminder.dialog.component';
// Edit User component
@Component({
	selector: 'app-editreminder',
	template: `<mat-dialog-content>
					<h5>Edit Reminder</h5>
					<form #editReminderForm="ngForm">
						<div class="row">
							<mat-form-field class="inputField">
								<input matInput
									placeholder="Reminder Title"
									id="reminderTitle"
									[(ngModel)]="reminder.reminderTitle"
									name="reminderTitle" required>
							</mat-form-field>
							<mat-form-field class="inputField">
								<textarea
									matInput
									placeholder="{{ reminder.reminderDetails }}"
									id="reminderDetails"
									[(ngModel)]="reminder.reminderDetails"
									name="reminderDetails"
									matTextareaAutosize matAutosizeMinRows="2">
								</textarea>
							</mat-form-field>
						</div>
						<div class="row">
							<mat-checkbox [(ngModel)]="checked" name="checked">Change reminder date</mat-checkbox>
						</div>
						<div class="row">
							<div *ngIf="checked" id="reminderTime">
								<mat-form-field>
									<input matInput
										[matDatepicker]="picker"
										[(ngModel)]="reminder.reminderDate"
										placeholder="Reminder date"
										id="reminderDate"
									name="reminderDate">
									<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
									<mat-datepicker #picker></mat-datepicker>
								</mat-form-field>
								<mat-form-field>
									<mat-select placeholder="Hour" id="hour" [(ngModel)]="timeInput.hour" name="hour">
									<mat-option *ngFor="let hour of hours" [value]="hour">
										{{ hour }}
									</mat-option>
									</mat-select>
								</mat-form-field>
								<mat-form-field>
									<mat-select placeholder="Minute" id="minute" [(ngModel)]="timeInput.minute" name="minute">
									<mat-option *ngFor="let minute of minutes" [value]="minute">
										{{ minute }}
									</mat-option>
									</mat-select>
								</mat-form-field>
								<mat-form-field>
									<mat-select placeholder="Time of Day" id="cycle" [(ngModel)]="timeInput.cycle" name="cycle">
									<mat-option *ngFor="let cycle of cycles" [value]="cycle">
										{{ cycle }}
									</mat-option>
									</mat-select>
								</mat-form-field>
							</div>
						</div>
					</form>
				</mat-dialog-content>
				<mat-dialog-actions>
					<button mat-button mat-dialog-close>Close</button>
					<button mat-button (click)="submitEdits()">Save Changes</button>
					<div *ngIf="submitSuccessful">
						<div class="alert alert-success">
							<strong>Success!</strong> Your changes have been made!
						</div>
					</div>
					<div *ngIf="submitFailed">
						<div class="alert alert-danger">
							<strong>Error!</strong> Something messed up.  Please try again.
						</div>
					</div>
				</mat-dialog-actions>`,
	styleUrls: [
		'./reminders.component.css'
	]
  })
  export class EditReminderComponent implements AfterViewInit {
	reminder: Reminder;
	oldDate: Date;
	hours = HOURS;
	minutes = MINUTES;
	cycles = CYCLES;
	timeInput: TimeInput;
	checked = false;
	submitSuccessful = false;
	submitFailed = false;
	code = '';
	constructor(
	  	public dialogRef: MatDialogRef<EditReminderComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private reminderService: ReminderService) {
			this.reminder = data.reminder;
			this.timeInput = new TimeInput();
			this.oldDate = this.reminder.reminderDate;
	}
	submitEdits() {
		if (this.checked) {
			this.reminder.reminderSent = false;
			if (this.timeInput.cycle === 'PM') {
				if (this.timeInput.hour !== 12) {
					this.timeInput.hour += 12;
				}
			}
			this.reminder.reminderDate.setHours(this.timeInput.hour, this.timeInput.minute);
		}
		this.reminderService.editReminder(this.reminder).subscribe(response => {
			if (response.id) {
				this.submitSuccessful = true;
				this.submitFailed = false;
			} else {
				this.submitFailed = true;
				this.submitSuccessful = false;
			}
		});
	}

	ngAfterViewInit() {
		// this.reminder.reminderDate = new Date();
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
