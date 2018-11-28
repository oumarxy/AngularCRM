import { OnInit, Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator, MatSort, MatDialog} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import 'rxjs/add/observable/of';
import 'hammerjs';
import { tap } from 'rxjs/operators';
import { MYPOLICYDISPLAY } from '../../../appdata/tablesettings';
import { Policy } from '../../../appdata/datamodels';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';
import { PolicyDataSource, PolicyService } from '../../../componentmodules/policy/policy.service';
import { LeadService } from '../../../componentmodules/leads/lead.service';
import { PolicyDetailComponent } from '../../../componentmodules/policy/policydetail.component';

@Component({
	selector: 'app-mypolicydatabase',
	styleUrls: [
		'../../../componentmodules/policy/policy.component.css'
	],
	templateUrl: '../../../componentmodules/policy/templates/policytable.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class MyPolicyDatabaseComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	selection = new SelectionModel<string>(true, []); // selection model for objects picked in data table
	selectedItems = []; // list of selected items
	displaySettings = MYPOLICYDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: PolicyDataSource | null; // initialize a UserDataSource
	results: Policy[]; // User array of results for datasource
	selectedPolicy: Policy; // selected user (for editing.  Need to add logic where only 1 can be selected at a time)

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	constructor(
		private policyService: PolicyService,
		private referenceDataConverter: ReferenceDataConverter,
		// private customerService: CustomerService,
		private leadService: LeadService,
		public dialog: MatDialog,
	) {}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.push('view');
		this.dataSource = new PolicyDataSource(this.policyService, this.paginator, this.sort, this.referenceDataConverter);
		this.dataSource.loadPoliciesByUserId('', 20, 0, JSON.parse(localStorage.getItem('user')).id);
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadPoliciesPage())
		).subscribe();
	}

	loadPoliciesPage() {
		this.dataSource.loadPoliciesByUserId(
			this.sort.active, this.paginator.pageSize, this.paginator.pageIndex, JSON.parse(localStorage.getItem('user')).id
		);
	}

	add() {}

	view(policy: Policy) {
		const dialogRef = this.dialog.open(PolicyDetailComponent, {
			data: { 'policy': policy },
			width: '95%',
			maxWidth: '100%'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPoliciesPage();
		});
	}
}

