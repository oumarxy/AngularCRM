import { Component, Inject } from '@angular/core';
import { Reminder } from '../../appdata/datamodels';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReminderService } from './reminders.service';

@Component({
	selector: 'app-addreminder',
	templateUrl: './addreminder.dialog.component.html',
	styleUrls: ['./reminders.component.css']
})
export class AddReminderComponent {
	reminder: Reminder;
	hours = HOURS;
	minutes = MINUTES;
	cycles = CYCLES;
	timeInput: TimeInput;

	constructor(
		public dialogRef: MatDialogRef<AddReminderComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private reminderService: ReminderService) {
			this.reminder = new Reminder();
			this.timeInput = new TimeInput();
	}

	addReminder() {
		this.reminder.userId = this.data.userId;
		this.reminder.userEmail = this.data.userEmail;
		this.reminder.leadId = this.data.leadId;
		this.reminder.reminderSent = false;
		if (this.timeInput.cycle === 'PM') {
			if (this.timeInput.hour !== 12) {
				this.timeInput.hour += 12;
			}
		}
		this.reminder.reminderDate.setHours(this.timeInput.hour, this.timeInput.minute);
		this.reminderService.addReminder(this.reminder).subscribe(response => response);
	}
}

export const HOURS = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];

export const MINUTES = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
	20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
	30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
	40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
	50, 51, 52, 53, 54, 55, 56, 57, 58, 59
];

export const CYCLES = [
	'AM', 'PM'
];

export class TimeInput {
	hour: number;
	minute: number;
	cycle: string;
}


