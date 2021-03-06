import { OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { tap } from 'rxjs/operators';
import { InsuranceLead } from '../../../appdata/datamodels';
import { MYLEADSDISPLAY } from '../../../appdata/tablesettings';
import { PATH } from '../../../services/services.config';
import { NavbarService } from '../../../core/navbar/navbar.service';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';
import { LeadDataSource, LeadService } from '../../../componentmodules/leads/lead.service';
import { LeadFilterComponent } from '../../../componentmodules/leads/dialogboxes/filter.dialog.component';
import { LeadDeleteComponent } from '../../../componentmodules/leads/dialogboxes/delete.dialog.component';
import { LeadAssignComponent } from '../../../componentmodules/leads/dialogboxes/assignleads.dialog.component';
import { LeadComponent } from '../../../componentmodules/leads/lead.component';

@Component({
	selector: 'app-myleadstable',
	styleUrls: ['../../../componentmodules/leads/css/leadtable.component.css'],
	templateUrl: '../../../componentmodules/leads/leadtable.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class MyLeadsComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	selection = new SelectionModel<string>(true, []); // selection model for objects picked in data table
	selectedItems = []; // list of selected items
	selectedLead: InsuranceLead; // selected user (for editing.  Need to add logic where only 1 can be selected at a time)
	displaySettings = MYLEADSDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: LeadDataSource | null; // initialize a UserDataSource
	results: InsuranceLead[]; // User array of results for datasource
	path = PATH; // set path from config file
	message: string; // messages from EventEmitter buttons
	/* Add to filter for every request

		const obj = JSON.parse(filter);
		obj['insuranceLead']['userId'] = JSON.parse(localStorage.getItem('user')).id;
		filter = JSON.stringify(obj);

	*/
	filterList = {
		'customer' : {},
		'insuranceLead': {},
		'emailAddress': '' };	// list of table filters
	title = 'My leads';

	isExpansionDetailRow;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	constructor(
		private leadService: LeadService,
		private navBarService: NavbarService,
		public dialog: MatDialog,
		private referenceDataConverter: ReferenceDataConverter,
	) {}

	ngOnInit() {
		this.sort.direction = 'asc';
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.unshift('select');
		this.dataSource = new LeadDataSource(this.leadService, this.paginator, this.sort, this.referenceDataConverter);
		this.dataSource.loadMyLeads('', 10, this.paginator.pageIndex, JSON.stringify(this.filterList));
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadLeadPage())
		).subscribe();

		this.sort.sortChange.pipe(
			tap(() => {
				this.loadLeadPage();
			})
		).subscribe();
	}

	loadLeadPage() {
		if (
			this.filterList !== {
				'customer' : {},
				'insuranceLead': {},
				'emailAddress': '' } &&
			(this.sort.active === 'firstName' || this.sort.active === 'lastName' || this.sort.active === 'emailAddress')
		) {
			this.filterList = {
				'customer' : {},
				'insuranceLead': {},
				'emailAddress': '' };
		}
		if (this.sort.active === undefined) {
			this.dataSource.loadMyLeads(
				'', this.paginator.pageSize, this.paginator.pageIndex, JSON.stringify(this.filterList)
			);
		} else {
			this.dataSource.loadMyLeads(
				this.sort.active + ',' + this.sort.direction, this.paginator.pageSize, this.paginator.pageIndex, JSON.stringify(this.filterList)
			);
		}
	}

	isAllSelected(): boolean {
		if (!this.dataSource) { return false; }
		if (this.selection.isEmpty()) { return false; } else {
			return this.selection.selected.length === this.dataSource.renderedData.length;
		}
	}

	masterToggle() {
		if (!this.dataSource) { return; }
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
		}
	}


	openLeadDetail(lead: InsuranceLead) {
		const dialogRef = this.dialog.open(LeadComponent, {
			data: {
				'lead': lead
			},
			width: '95%',
			maxWidth: '100%'
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear();
			this.selectedItems = [];
			this.loadLeadPage();
		});
	}

	isAdmin() {
		return this.navBarService.isAdmin();
	}

	myLeads() {
		return true;
	}

	openFilters() {
		const dialogRef = this.dialog.open(LeadFilterComponent, { data: {} });
		const sub = dialogRef.componentInstance.filterEvent.subscribe( res => {
			this.filterList = res;
		});
		dialogRef.componentInstance.filterList = this.filterList;
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
			this.loadLeadPage();
		});
	}


	clearFilters() {
		this.filterList = {
			'customer' : {},
			'insuranceLead': {},
			'emailAddress': '' };
		this.loadLeadPage();
	}

	delete(lead: InsuranceLead) {
		this.selectedItems.push(lead);
		const dialogRef = this.dialog.open(LeadDeleteComponent, {
			data: {
				'leadIds': this.selectedItems,
				'userId': localStorage.getItem('#userid')
			}
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear();
			this.selectedItems = [];
			this.loadLeadPage();
		});
	}

	deleteSelection() {
		this.selection.selected.forEach(element => {
			this.selectedItems.push(element);
		});
		const dialogRef = this.dialog.open(LeadDeleteComponent, {
			data: { 'leads' : this.selectedItems }
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear();
			this.selectedItems = [];
			this.loadLeadPage();
		});
	}

	setFilters($event) {
		if ($event) {
			this.filterList = $event;
		}
	}

	assignLeads() {
		this.selection.selected.forEach(element => {
			this.selectedItems.push(this.dataSource.renderedData.find(data => data.id === element));
		});
		const dialogRef = this.dialog.open(LeadAssignComponent, {
			data: {
				'selection' : this.selectedItems
			}
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear();
			this.selectedItems = [];
			this.loadLeadPage();
		});

	}

}
