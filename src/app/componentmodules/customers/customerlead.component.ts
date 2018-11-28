import { OnInit, Component, ViewChild, AfterViewInit, Inject} from '@angular/core';
import { MatPaginator, MAT_DIALOG_DATA, MatDialogRef, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Customer, InsuranceLead } from '../../appdata/datamodels';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { LeadService, LeadDataSource } from '../leads/lead.service';
import { EditCustomerComponent } from './dialogboxes/editcustomer.dialog.component';
import { CustomerService } from './customer.service';
import { CUSTOMERLEADSDISPLAY } from '../../appdata/tablesettings';
import { tap } from 'rxjs/operators';
import { LeadComponent } from '../leads/lead.component';

@Component({
	selector: 'app-customerleads',
	styleUrls: [
		'./css/customerlead.component.css'
	],
	templateUrl: './templates/customerlead.component.html',
})
export class CustomerLeadsComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	displaySettings = CUSTOMERLEADSDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: LeadDataSource | null; // initialize a UserDataSource

	customer: Customer;
	// paginators
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		public dialogRef: MatDialogRef<CustomerLeadsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private leadService: LeadService,
		private customerService: CustomerService,
		private referenceDataConverter: ReferenceDataConverter,
		public dialog: MatDialog
	) {
		this.customer = data.customer;
	}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.dataSource = new LeadDataSource(this.leadService, this.paginator, this.sort, this.referenceDataConverter);
		this.dataSource.loadCustomerLeads(this.customer.id, this.paginator.pageIndex);
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadLeadPage())
		).subscribe();
	}

	loadLeadPage() {
		this.dataSource.loadCustomerLeads(this.customer.id, this.paginator.pageIndex);
	}

	loadCustomer() {
		this.customerService.getCustomerById(this.customer.id).subscribe(result => {
			this.referenceDataConverter.convertReferenceIdsToValue(result);
			this.customer = result;
		});
	}

	editCustomer() {
		const dialogRef = this.dialog.open(EditCustomerComponent, {
			data: {
				'customer': this.customer
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadCustomer();
		});
	}

	onNoClick(): void { // closes dialog window if clicked outside box
		this.dialogRef.close();
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
			this.loadLeadPage();
		});
	}

}
