import { OnInit, Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Reminder } from '../../../appdata/datamodels';
import { REMINDERSDISPLAY } from '../../../appdata/tablesettings';
import { ReminderDataSource, ReminderService } from '../../../componentmodules/reminders/reminders.service';
import { EditReminderComponent } from '../../../componentmodules/reminders/editreminder.component';
import { DeleteReminderComponent } from '../../../componentmodules/reminders/deletereminder.component';
import { AddReminderComponent } from '../../../componentmodules/reminders/addreminder.dialog.component';
import { ViewReminderComponent } from '../../../componentmodules/reminders/viewreminder.dialog.component';

@Component({
	selector: 'app-myreminderscomponent',
	styleUrls: [
		'../../../componentmodules/reminders/reminders.component.css',
	],
	templateUrl: '../../../componentmodules/reminders/myreminders.component.html',
})
export class MyReminderComponent implements OnInit, AfterViewInit {
	displayedColumns = [];
	reminderDisplaySettings = REMINDERSDISPLAY;
	reminderDataSource: ReminderDataSource | null;
	sentReminderDataSource: ReminderDataSource | null;

	@ViewChild('myreminderpaginator') myreminderpaginator: MatPaginator;
	@ViewChild('sentreminderpaginator') sentreminderpaginator: MatPaginator;

	constructor(
		private reminderService: ReminderService,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.displayedColumns = this.reminderDisplaySettings.map(x => x.columnDef);
		this.displayedColumns.push('view');
		this.displayedColumns.push('edit');
		this.displayedColumns.push('delete');
		this.reminderDataSource = new ReminderDataSource(this.reminderService, this.myreminderpaginator);
		this.sentReminderDataSource = new ReminderDataSource(this.reminderService, this.sentreminderpaginator);
		this.loadRemindersPage();
	}

	ngAfterViewInit() {
		this.myreminderpaginator.page.pipe(
			tap(() => this.loadRemindersPage())
		).subscribe();
		this.sentreminderpaginator.page.pipe(
			tap(() => this.loadRemindersPage())
		).subscribe();
	}

	loadRemindersPage() {
		if (localStorage.getItem('user') !== null) {
			const userId = JSON.parse(localStorage.getItem('user')).id;
			this.reminderDataSource.loadRemindersByUserIdAndSent('reminderDate,asc', 10, this.myreminderpaginator.pageIndex, userId, false);
			this.sentReminderDataSource.loadRemindersByUserIdAndSent('reminderDate,desc', 10, this.sentreminderpaginator.pageIndex, userId, true);
			// this.reminderDataSource.loadRemindersByUserId(10, this.myreminderpaginator.pageIndex, userId);

		}
	}

	addReminder() {
		if (localStorage.getItem('user') !== null) {
			const dialogRef = this.dialog.open(AddReminderComponent, {
				data: {
					// 'leadId': this.lead.id,
					'userId': JSON.parse(localStorage.getItem('user')).id,
					'userEmail': JSON.parse(localStorage.getItem('user')).email
				}
			});
			dialogRef.afterClosed().subscribe(result => {
				this.loadRemindersPage();
			});
		}
	}

	edit(reminder: Reminder) {
		const dialogRef = this.dialog.open(EditReminderComponent, {
			data: {
				'reminder': reminder
			},
			minWidth: '300px'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadRemindersPage();
		});
	}

	delete(reminder: Reminder) {
		const dialogRef = this.dialog.open(DeleteReminderComponent, {
			data: {
				'reminder': reminder
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadRemindersPage();
		});
	}

	view(reminder: Reminder) {
		const dialogRef = this.dialog.open(ViewReminderComponent, {
			data: {
				'reminder': reminder
			},
			minWidth: '300px'
		});
		dialogRef.afterClosed().subscribe(result => {});
	}

}

