import { OnInit, Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatPaginator} from '@angular/material';
import { MatDialog} from '@angular/material';
import { tap } from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import 'rxjs/add/observable/of';
import 'hammerjs';
import { InsuranceLead, CustomerEmail } from '../../appdata/datamodels';
import { CUSTOMEREMAILDISPLAY } from '../../appdata/tablesettings';
import { EmailAddressDataSource, EmailAddressService } from './emailaddresses.service';
import { PATH } from '../../services/services.config';
import { FormControl, Validators } from '@angular/forms';
import { EmailAddressEditComponent } from './editemailaddress.component';
import { EmailAddressDeleteComponent } from './deleteemailaddress.component';
/**
 * @title Table retrieving data through HTTP
 */
@Component({
	selector: 'app-emailaddresscomponent',
	styleUrls: ['emailaddress.component.css'],
	templateUrl: 'emailaddress.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class EmailAddressComponent implements OnInit, AfterViewInit {
	@Input() lead: InsuranceLead;
	emailDisplayedColumns = [];
	emailDisplaySettings = CUSTOMEREMAILDISPLAY;
	emailDataSource: EmailAddressDataSource | null;
	path = PATH; // set path from config file
	// email variables
	emailAddress: CustomerEmail;
	// form control to ensure added email is valid.  This can be done for all other fields
	email = new FormControl('', [Validators.required, Validators.email]);

	@ViewChild('emailpaginator') emailpaginator: MatPaginator;
	constructor(
		private emailService: EmailAddressService,
		public dialog: MatDialog) {
			this.emailAddress = new CustomerEmail();

		}

	ngOnInit() {
		this.emailDisplayedColumns = this.emailDisplaySettings.map(x => x.columnDef);
		this.emailDisplayedColumns.push('edit');
		this.emailDisplayedColumns.push('delete');
		this.emailDataSource = new EmailAddressDataSource(this.emailService, this.emailpaginator);
		this.emailDataSource.loadEmailsByCustomerId('', 5, this.emailpaginator.pageIndex, this.lead.customerId);
	}


	ngAfterViewInit() {
		this.emailpaginator.page.pipe(
			tap(() => this.loadEmailPage())
		).subscribe();
	}

	loadEmailPage() {
		this.emailDataSource.loadEmailsByCustomerId('', 5, this.emailpaginator.pageIndex, this.lead.customerId);
	}

	addEmail() {
		this.emailAddress.customerId = this.lead.customerId;
		if (this.email.hasError('required') || this.email.hasError('email')) {
			return;
		}
		this.emailService.addEmail(this.emailAddress).subscribe(response => {
			this.loadEmailPage();
			this.emailAddress = new CustomerEmail();
		});
	}
	getErrorMessage() { // Error message if email is not valid
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}

	edit(customerEmail: CustomerEmail) {
		const dialogRef = this.dialog.open(EmailAddressEditComponent, {
			data: {
				'customerEmail': customerEmail
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadEmailPage();
		});
	}

	delete(customerEmail: CustomerEmail) {
		const dialogRef = this.dialog.open(EmailAddressDeleteComponent, {
			data: {
				'customerEmail': customerEmail
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadEmailPage();
		});
	}
}


