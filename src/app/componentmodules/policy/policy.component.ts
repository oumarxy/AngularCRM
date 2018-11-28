import { OnInit, Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { MatDialog } from '@angular/material';
import { PolicyService, PolicyDataSource } from './policy.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { tap } from 'rxjs/operators';
import { PolicyEditComponent } from './editpolicy.dialog.component';
import { PolicyDeleteComponent } from './deletepolicy.dialog.component';
import { Policy, InsuranceLead } from '../../appdata/datamodels';
import { POLICYDISPLAY } from '../../appdata/tablesettings';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { PolicyDetailComponent } from './policydetail.component';
import { PolicyCreateComponent } from './createpolicy.dialog.component';

@Component({
	selector: 'app-policies',
	styleUrls: [
		'./policy.component.css'
	],
	templateUrl: './templates/policy.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class PolicyComponent implements OnInit, AfterViewInit {
	@Input() lead: InsuranceLead;
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	displaySettings = POLICYDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: PolicyDataSource | null; // initialize a UserDataSource
	results: Policy[]; // User array of results for datasource
	newPolicyWindowOpen = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private policyService: PolicyService,
		private referenceDataConverter: ReferenceDataConverter,
		public dialog: MatDialog,
	) {}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.push('view');
		this.dataSource = new PolicyDataSource(this.policyService, this.paginator, this.sort, this.referenceDataConverter);
		this.loadPolicyPage();
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadPolicyPage())
		).subscribe();
	}

	loadPolicyPage() {
		this.dataSource.loadPoliciesByLeadId('', 5, this.paginator.pageIndex, this.lead.id);
	}

	openNewPolicy() {
		const dialogRef = this.dialog.open(PolicyCreateComponent, {
			data: { 'lead': this.lead },
			width: '80%',
			maxWidth: '95%'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPolicyPage();
		});
	}
	edit(policy: Policy) {
		const dialogRef = this.dialog.open(PolicyEditComponent, {
			data: { 'policy': policy },
			width: '95%',
			maxWidth: '100%'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPolicyPage();
		});
	}

	delete(policy: Policy) {
		const dialogRef = this.dialog.open(PolicyDeleteComponent, {
			data: { 'policy': policy }
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPolicyPage();
		});
	}

	view(policy: Policy) {
		const dialogRef = this.dialog.open(PolicyDetailComponent, {
			data: { 'policy': policy },
			width: '95%',
			maxWidth: '100%'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPolicyPage();
		});
	}
}

