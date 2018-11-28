import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { tap } from 'rxjs/operators';
import { EditNoteComponent } from './editnote.dialog.component';
import { EditActivityComponent } from './editactivity.dialog.component';
import { InsuranceLead, Note, TodayActivity, TodayLeadActivity } from '../../appdata/datamodels';
import { NOTESDISPLAY, TODAYLEADACTIVITYDISPLAY } from '../../appdata/tablesettings';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { TodayLeadActivityService, NoteService, NoteDataSource, TodayLeadActivityDataSource } from './notesactivities.service';
import { ViewNoteComponent } from './viewnote.dialog.component';

@Component({ // Delete component
	selector: 'app-notesandactivities',
	templateUrl: './notesactivities.component.html',
	styleUrls: [
		'./notesactivities.component.css'
	],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class NotesAndActivitiesComponent implements OnInit, AfterViewInit {
	@Input() lead: InsuranceLead;
	note: Note;
	noteList: Note[];
	activities: TodayActivity[];
	activity: TodayLeadActivity;
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	displaySettings = NOTESDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: NoteDataSource | null; // initialize a UserDataSource

	todayActivityList: TodayActivity[];
	displayedActivityColumns = []; // Empty variable initialized for the displayed columns on the data table
	displayActivitySettings = TODAYLEADACTIVITYDISPLAY; // set the display settings to those in the table settings file in appdata
	activityDataSource: TodayLeadActivityDataSource | null; // initialize a UserDataSource

	@ViewChild('notepaginator') notepaginator: MatPaginator;
	@ViewChild('activitypaginator') activitypaginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private activityService: TodayLeadActivityService,
		private noteService: NoteService,
		public dialog: MatDialog,
		private referenceDataConverter: ReferenceDataConverter) {
			this.note = new Note();
			this.activity = new TodayLeadActivity();
			this.referenceDataConverter.loadData().subscribe(result => {
				this.activities = this.referenceDataConverter.getTodayActivity();
				// this.dataLoaded = true;
			});
		}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.push('view');
		this.displayedColumns.push('edit');
		this.displayedColumns.push('delete');
		this.dataSource = new NoteDataSource(this.noteService, this.notepaginator, this.sort, this.referenceDataConverter);
		this.dataSource.loadNotesByLeadId('', 5, this.notepaginator.pageIndex, this.lead.id);

		this.displayedActivityColumns = this.displayActivitySettings.map(x => x.columnDef );
		this.displayedActivityColumns.push('editActivity');
		this.displayedActivityColumns.push('deleteActivity');
		this.activityDataSource = new TodayLeadActivityDataSource(this.activityService, this.activitypaginator, this.referenceDataConverter);
		this.activityDataSource.loadTodayLeadActivityByLeadId('', 5, this.activitypaginator.pageIndex, this.lead.id);
	}

	ngAfterViewInit() {
		this.notepaginator.page.pipe(
			tap(() => this.loadNotesTable())
		).subscribe();

		this.activitypaginator.page.pipe(
			tap(() => this.loadTodayActivityTable())
		).subscribe();
	}

	loadNotesTable() {
		this.dataSource.loadNotesByLeadId('', 5, this.notepaginator.pageIndex, this.lead.id);
	}
	loadTodayActivityTable() {
		this.activityDataSource.loadTodayLeadActivityByLeadId('', 5, this.activitypaginator.pageIndex, this.lead.id);
	}

	addNote() {
		this.note.leadId = this.lead.id;
		this.note.userId = JSON.parse(localStorage.getItem('user')).id;
		this.noteService.addNote(this.note).subscribe(res => {
			this.loadNotesTable();
		}, err => {
		});
	}

	addActivity() {
		this.activity.leadId = this.lead.id;
		this.activity.userId = JSON.parse(localStorage.getItem('user')).id;
		this.activityService.addTodayLeadActivity(this.activity).subscribe(res => {
			// this.activity.updateLeadLastContact(this.lead);
			this.loadTodayActivityTable();
		}, err => {
		});
	}


	edit(note: Note) {
		const dialogRef = this.dialog.open(EditNoteComponent, {
			data: {
				'note' : note
			},
			width: '75%',
			maxWidth: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadNotesTable();
		});
	}

	view(note: Note) {
		const dialogRef = this.dialog.open(ViewNoteComponent, {
			data: {
				'note' : note
			},
			minWidth: '300px'
		});
		dialogRef.afterClosed().subscribe(result => {});
	}

	editActivity(activity: TodayLeadActivity) {
		const dialogRef = this.dialog.open(EditActivityComponent, {
			data: {
				'activity' : activity
			},
			width: '75%',
			maxWidth: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadTodayActivityTable();
		});
	}


	delete(note: Note) {
		this.noteService.deleteNote(note).subscribe(response => {
			this.loadNotesTable();
		});
	}

	deleteActivity(activity: TodayLeadActivity) {
		this.activityService.deleteTodayLeadActivity(activity).subscribe(response => {
			this.loadTodayActivityTable();
		});
	}
}


