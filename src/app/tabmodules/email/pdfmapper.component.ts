import { OnInit, Component, Inject, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { EmailService } from './email.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { EmailAttachment, InsuranceLead } from '../../appdata/datamodels';
import { SHORTINSURANCELEADSDISPLAY } from '../../appdata/tablesettings';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { LeadService, LeadDataSource } from '../../componentmodules/leads/lead.service';

@Component({
	selector: 'app-savepdf',
	styleUrls: [
		'./pdfmapper.component.css'
	],
	templateUrl: './pdfmapper.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class PDFMapperComponent implements AfterViewInit, OnInit {
	doc: EmailAttachment;

	selection = new SelectionModel<string>(true, []); // selection model for objects picked in data table
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	displaySettings = SHORTINSURANCELEADSDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: LeadDataSource | null; // initialize a UserDataSource
	selectedLead: InsuranceLead;

	filterList = {
		'customer' : {},
		'insuranceLead': {},
		'emailAddress': '' };	// list of table filters

	resultsLength;
	isLoadingResults = true;
	isRateLimitReached = false;
	isSelected = false;
	showPage;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('customerIdFilter') lastNameFilter: ElementRef;
	@ViewChild('insuranceLeadIdFilter') firstNameFilter: ElementRef;
	@ViewChild('policyIdFilter') duplicateToggle: ElementRef;
	@ViewChild('documentDisplay', {read: ElementRef}) documentDisplay: ElementRef;

	constructor(
		public dialogRef: MatDialogRef<PDFMapperComponent>,	// same shit as above
	  	@Inject(MAT_DIALOG_DATA) public data: any,
	  	private emailService: EmailService,
		private leadService: LeadService,
		public dialog: MatDialog,
		private referenceDataConverter: ReferenceDataConverter,
		private renderer: Renderer2) {
			this.doc = data.document;
	}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.dataSource = new LeadDataSource(this.leadService, this.paginator, this.sort, this.referenceDataConverter);
		this.dataSource.loadLeads('', 10, 0, JSON.stringify(this.filterList));
		this.renderer.setStyle(this.documentDisplay.nativeElement, 'border', '0');
		this.renderer.setStyle(this.documentDisplay.nativeElement, 'top', '0px');
		this.renderer.setStyle(this.documentDisplay.nativeElement, 'left', '0px');
		this.renderer.setStyle(this.documentDisplay.nativeElement, 'bottom', '0px');
		this.renderer.setStyle(this.documentDisplay.nativeElement, 'right', '0px');
		this.renderer.setStyle(this.documentDisplay.nativeElement, 'width', '100%');
		this.renderer.setStyle(this.documentDisplay.nativeElement, 'height', '100%');
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadLeadPage())
		).subscribe();
		this.renderer.setProperty(this.documentDisplay.nativeElement, 'src', 'data:application/pdf;base64,' + this.doc.contentBytes);

	}

	loadLeadPage() {
		this.dataSource.loadLeads(
			this.sort.active, this.paginator.pageSize, this.paginator.pageIndex, JSON.stringify(this.filterList)
		);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	selectRow(insuranceLead: InsuranceLead) {
		this.isSelected = true;
		this.selectedLead = insuranceLead;
	}

	isLeadSelected() {
		return this.isSelected;
	}

	savePDF() {
		if (this.selectedLead.policyId === null) {
			this.selectedLead.policyId = '';
		}
		const documentData = {
			'customerId' : this.selectedLead.customerId,
			'insuranceLeadId' : this.selectedLead.id,
			'policyId' : this.selectedLead.policyId,
			'ContentBytes': this.doc.contentBytes,
			'ContentType' : this.doc.contentType,
			'DateTimeLastModified' : this.doc.lastModifiedDateTime,
			'Name': this.doc.name,
			'Size' : this.doc.size
		};
		this.emailService.savePDF(documentData);
	}
}


