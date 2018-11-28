import { OnInit, Component, ElementRef, ViewChild, AfterViewInit, Input, Inject} from '@angular/core';
import { MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatDialog } from '@angular/material';
import { PolicyService, PolicyDataSource } from './policy.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PolicyEditComponent } from './editpolicy.dialog.component';
import { PolicyDeleteComponent } from './deletepolicy.dialog.component';
import { Policy, Customer, UnfilteredInsuranceLead, FileStoreDocument, InsuranceLead } from '../../appdata/datamodels';
import { POLICYDISPLAY } from '../../appdata/tablesettings';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { DocumentService } from '../documents/documents.service';
import { CustomerService } from '../customers/customer.service';
import { LeadService } from '../leads/lead.service';

@Component({
	selector: 'app-policydetail',
	styleUrls: [
		'./policy.component.css'
	],
	templateUrl: './templates/policydetail.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class PolicyDetailComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	displaySettings = POLICYDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: PolicyDataSource | null; // initialize a UserDataSource
	results: Policy[]; // User array of results for datasource
	message: string; // messages from EventEmitter buttons
	policy: Policy;
	selectedCustomer: Customer;
	selectedLead: UnfilteredInsuranceLead;
	policyDocuments: FileStoreDocument[];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	@ViewChild('documentDisplay', {read: ElementRef}) documentDisplay: ElementRef;

	constructor(
		public dialogRef: MatDialogRef<PolicyDetailComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private policyService: PolicyService,
		private referenceDataConverter: ReferenceDataConverter,
		private customerService: CustomerService,
		private leadService: LeadService,
		private documentService: DocumentService,
		public dialog: MatDialog,
	) {
		this.policy = data.policy;
	}

	ngOnInit() {
		this.loadPolicy();
	}

	ngAfterViewInit() {
	}

	loadPolicy() {
		this.policyService.getPolicyById(this.data.policy.id).subscribe(res => {
			this.policy = res;
		});
		this.customerService.getCustomerById(this.data.policy.customerId).subscribe(res => {
			this.selectedCustomer = res;
		});
		this.leadService.getLeadById(this.data.policy.leadId).subscribe(res => {
			this.selectedLead = res;
		});
		this.documentService.getDocumentsByInsuranceLeadId(this.data.policy.leadId).subscribe(res => {
			this.policyDocuments = res['_embedded']['storedfiles'];
		});
	}

	edit() {
		const dialogRef = this.dialog.open(PolicyEditComponent, {
			data: { 'policy': this.data.policy }
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPolicy();
		});
	}

	delete() {
		const dialogRef = this.dialog.open(PolicyDeleteComponent, {
			data: { 'policy': this.data.policy }
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPolicy();
		});
	}
}

