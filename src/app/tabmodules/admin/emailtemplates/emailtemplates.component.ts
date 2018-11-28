import { OnInit, Component, ViewChild, Inject, AfterViewInit} from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EmailTemplateService, EmailTemplateDataSource } from './emailtemplates.service';
import { tap } from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import 'rxjs/add/observable/of';
import 'hammerjs';
import { EmailTemplate } from '../../../appdata/datamodels';
import { EMAILTEMPLATESDISPLAY } from '../../../appdata/tablesettings';

@Component({
	selector: 'app-emailtemplatetable',
	styleUrls: ['emailtemplates.component.css'],
	templateUrl: 'emailtemplates.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],

})
export class EmailTemplateComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	selection = new SelectionModel<string>(true, []); // selection model for objects picked in data table
	selectedItems = []; // list of selected items
	selectedEmailTemplate: EmailTemplate; // selected user (for editing.  Need to add logic where only 1 can be selected at a time)
	displaySettings = EMAILTEMPLATESDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: EmailTemplateDataSource | null; // initialize a UserDataSource
	results: EmailTemplate[]; // User array of results for datasource
	isExpansionDetailRow;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private emailTemplateService: EmailTemplateService, public dialog: MatDialog) {}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.push('edit');
		this.displayedColumns.push('delete');
		this.dataSource = new EmailTemplateDataSource(this.emailTemplateService, this.paginator, this.sort);
		this.dataSource.loadEmailTemplates('', 10, 0);
		this.isExpansionDetailRow = (i, row) => row.hasOwnProperty('detailRow');
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadEmailTemplatePage())
		).subscribe();

	}

	loadEmailTemplatePage() {
		this.dataSource.loadEmailTemplates(
			this.sort.active, this.paginator.pageSize, this.paginator.pageIndex
		);
	}


	edit(emailTemplate: EmailTemplate) {
		const dialogRef = this.dialog.open(EditEmailTemplateComponent, {
			data: { 'emailTemplate' : emailTemplate }
		});
		// reload the table and clear your selection after the dialog box is closed
		dialogRef.afterClosed().subscribe(result => {
			this.loadEmailTemplatePage();
		});
	}

	delete(emailTemplate: EmailTemplate) {
		const dialogRef = this.dialog.open(DeleteEmailTemplateComponent, {
			data: { 'emailTemplate' : emailTemplate }
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.loadEmailTemplatePage();
		});
	}

	add() {
		const dialogRef = this.dialog.open(AddEmailTemplateComponent, {
			data: {}
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
			this.loadEmailTemplatePage();
		});
	}
}


// Add dialog box
@Component({
	selector: 'app-addemailtemplate',
	templateUrl: './emailtemplates.add.dialog.component.html',
	styleUrls: [
		'./emailtemplates.component.css'
	]
})
export class AddEmailTemplateComponent {
	// Title for dialog box
	refdata = 'EmailTemplate';
	emailTemplate: EmailTemplate;
	constructor(
		public dialogRef: MatDialogRef<AddEmailTemplateComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private emailTemplateService: EmailTemplateService) {	// API service for adding users
			this.emailTemplate = new EmailTemplate();
		}
	addEmailTemplate() {
		this.emailTemplateService.addEmailTemplate(this.emailTemplate);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}


// Edit EmailTemplate component
@Component({
	selector: 'app-editemailtemplate',
	templateUrl: './emailtemplates.edit.dialog.component.html',
	styleUrls: [
		'./emailtemplates.component.css'
	]
  })
  export class EditEmailTemplateComponent {
	editEmailTemplate: EmailTemplate;
	emailTemplate: EmailTemplate;
	// array of changes.  This is a generic JSON array.  You do not pass an object here
	// Edit function uses a PATCH instead of a PUT.  According to RFC 7000-something, for updating a field you only pass what you need
	changes: any = {};
	constructor(
	  	public dialogRef: MatDialogRef<EditEmailTemplateComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private emailTemplateService: EmailTemplateService) {
			this.emailTemplate = new EmailTemplate();	// new emailTemplate created in the event of a PUT
		 	this.editEmailTemplate = data.emailTemplate;
		}

	submitEdits() {
		// merge objects (use this for a PUT call)
		Object.assign(this.editEmailTemplate, this.emailTemplate);  // merges new emailTemplate to old emailTemplate and maps over old fields
		// call the updateEmailTemplate service.  Passes the changes array and the id of the emailtemplate to be edited
		this.emailTemplateService.updateEmailTemplate(this.editEmailTemplate);
	}

	onNoClick(): void {
	  this.dialogRef.close();
	}
	// call API service edit function

}


// Delete component
@Component({
	selector: 'app-deleteemailtemplates',
	templateUrl: './emailtemplates.delete.dialog.component.html',
  })
  export class DeleteEmailTemplateComponent {
	refdata = 'EmailTemplate';
	// selection array of all the id's to be deleted (for group delete)
	emailTemplate;
	constructor(
		public dialogRef: MatDialogRef<DeleteEmailTemplateComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private emailTemplateService: EmailTemplateService) {
			this.emailTemplate = data.emailTemplate;
		}

	deleteEmailTemplate() {
		this.emailTemplateService.deleteEmailTemplate(this.emailTemplate);
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}

}
