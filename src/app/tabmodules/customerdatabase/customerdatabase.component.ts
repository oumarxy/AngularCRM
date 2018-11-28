import { OnInit, Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { Observable} from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { tap } from 'rxjs/operators';
import { Customer } from '../../appdata/datamodels';
import { CUSTOMERSDISPLAY } from '../../appdata/tablesettings';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { CustomerDataSource, CustomerService } from '../../componentmodules/customers/customer.service';
import { EditCustomerComponent } from '../../componentmodules/customers/dialogboxes/editcustomer.dialog.component';
import { DeleteCustomerComponent } from '../../componentmodules/customers/dialogboxes/deletecustomer.dialog.component';
import { DuplicateResolutionComponent } from '../../componentmodules/customers/duplicateResolution/resolveduplicate.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'hammerjs';
import { CustomerLeadsComponent } from '../../componentmodules/customers/customerlead.component';
@Component({
	selector: 'app-customersdb',
	styleUrls: [
		'../../componentmodules/customers/css/customer.component.css'
	],
	templateUrl: '../../componentmodules/customers/templates/customertable.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class CustomerDatabaseComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	selection = new SelectionModel<string>(true, []); // selection model for objects picked in data table
	selectedItems = []; // list of selected items
	selectedUser: Customer; // selected user (for editing.  Need to add logic where only 1 can be selected at a time)
	displaySettings = CUSTOMERSDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: CustomerDataSource | null; // initialize a UserDataSource
	duplicatesToggled = false;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('lastNameFilter') lastNameFilter: ElementRef;
	@ViewChild('firstNameFilter') firstNameFilter: ElementRef;
	@ViewChild('emailFilter') emailFilter: ElementRef;
	@ViewChild('duplicateToggle') duplicateToggle: ElementRef;
	constructor(private customerService: CustomerService, public dialog: MatDialog, private referenceDataConverter: ReferenceDataConverter) {}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.dataSource = new CustomerDataSource(this.customerService, this.paginator, this.sort, this.referenceDataConverter);
		this.dataSource.loadCustomers('', 10, 0);
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadCustomersPage())
		).subscribe();

		Observable.fromEvent(this.firstNameFilter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				this.lastNameFilter.nativeElement.value = '';
				this.emailFilter.nativeElement.value = '';
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.firstNameFilter.nativeElement.value;
				this.loadCustomersPageByFirstName();
		});
		Observable.fromEvent(this.lastNameFilter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				this.firstNameFilter.nativeElement.value = '';
				this.emailFilter.nativeElement.value = '';
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.lastNameFilter.nativeElement.value;
				this.loadCustomersPageByLastName();
		});
		Observable.fromEvent(this.emailFilter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				this.firstNameFilter.nativeElement.value = '';
				this.lastNameFilter.nativeElement.value = '';
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.emailFilter.nativeElement.value;
				this.loadCustomersPageByEmail();
		});

		this.sort.sortChange.pipe(
			tap(() => {
				this.loadCustomersPage();
			})
		).subscribe();
	}

	loadCustomersPage() {
		this.dataSource.loadCustomers(
			this.sort.active + ',' + this.sort.direction, this.paginator.pageSize, this.paginator.pageIndex
		);
	}

	loadCustomersPageByFirstName() {
		this.dataSource.loadCustomersByFirstName(
			this.sort.active, this.paginator.pageSize, this.paginator.pageIndex
		);
	}

	loadCustomersPageByLastName() {
		this.dataSource.loadCustomersByLastName(
			this.sort.active, this.paginator.pageSize, this.paginator.pageIndex
		);
	}

	loadCustomersPageByEmail() {
		this.dataSource.loadCustomersByEmail(
			this.sort.active, this.paginator.pageSize, this.paginator.pageIndex
		);
	}

	showDuplicates() {
		if (this.duplicatesToggled === false) {
			this.duplicatesToggled = true;
			this.dataSource.loadDuplicates(
				this.sort.active, this.paginator.pageSize, this.paginator.pageIndex
			);
		} else {
			this.duplicatesToggled = false;
			this.loadCustomersPage();
		}
	}

	edit(customer: Customer) {
		const dialogRef = this.dialog.open(EditCustomerComponent, {
			data: {
				'customer': customer
			}
		});
		// set the editUser in the dialog box to the selected user.  Allows data to be loaded to the dialog box component
		// reload the table and clear your selection after the dialog box is closed
		dialogRef.afterClosed().subscribe(result => {
			this.loadCustomersPage();
		});
	}

	delete(customer: Customer) {
		const dialogRef = this.dialog.open(DeleteCustomerComponent, {
			data: {
				'customer': customer
			}
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.loadCustomersPage();
		});
	}

	openCustomerDetail(customer: Customer) {
		const dialogRef = this.dialog.open(CustomerLeadsComponent, {
			data: {
				'customer': customer
			},
			width: '95%',
			maxWidth: '100%'
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear();
			this.selectedItems = [];
			this.loadCustomersPage();
		});
	}

	resolveDuplicate($event, row) {
		const dialogRef = this.dialog.open(DuplicateResolutionComponent, { data: {
			rowInfo: row
		} });
		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear();
			this.selectedItems = [];
			this.loadCustomersPage();
		});
	}
}
