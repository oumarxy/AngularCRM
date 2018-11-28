import { OnInit, Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ReminderService, ReminderDataSource } from './reminders.service';
import { Reminder, InsuranceLead } from '../../appdata/datamodels';
import { REMINDERSDISPLAY } from '../../appdata/tablesettings';
import { MatPaginator, MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { EditReminderComponent } from './editreminder.component';
import { DeleteReminderComponent } from './deletereminder.component';
import { AddReminderComponent } from './addreminder.dialog.component';
import { ViewReminderComponent } from './viewreminder.dialog.component';

@Component({
	selector: 'app-remindercomponent',
	styleUrls: [
		'./reminders.component.css',
	],
	templateUrl: './reminders.component.html',
})
export class ReminderComponent implements OnInit, AfterViewInit {
	@Input() lead: InsuranceLead;
	displayedColumns = [];
	reminderDisplaySettings = REMINDERSDISPLAY;
	reminderDataSource: ReminderDataSource | null;

	@ViewChild(MatPaginator) reminderpaginator: MatPaginator;

	constructor(
		private reminderService: ReminderService,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.displayedColumns = this.reminderDisplaySettings.map(x => x.columnDef);
		this.displayedColumns.push('view');
		this.displayedColumns.push('edit');
		this.displayedColumns.push('delete');
		this.reminderDataSource = new ReminderDataSource(this.reminderService, this.reminderpaginator);
		this.loadRemindersPage();
	}

	ngAfterViewInit() {
		this.reminderpaginator.page.pipe(
			tap(() => this.loadRemindersPage())
		).subscribe();
	}

	loadRemindersPage() {
		this.reminderDataSource.loadRemindersByLeadId(10, this.reminderpaginator.pageIndex, this.lead.id);
	}

	addReminder() {
		if (localStorage.getItem('user') !== null) {
			const dialogRef = this.dialog.open(AddReminderComponent, {
				data: {
					'leadId': this.lead.id,
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

