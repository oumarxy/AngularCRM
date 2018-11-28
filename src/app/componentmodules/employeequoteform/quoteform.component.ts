import { OnInit, Component, Input } from '@angular/core';
import { QuoteFormService } from './quoteform.service';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import {
	PhoneType,
	Referral,
	State,
	RoofType,
	SidingType,
	LeadStatus,
	LeadSource,
	HomeType,
	User,
	InsuranceLead,
	Customer,
	Email,
	CustomerEmail,
	UnfilteredInsuranceLead} from '../../appdata/datamodels';
import { FormControl, Validators } from '@angular/forms';
import { LeadService } from '../leads/lead.service';
import { CustomerService } from '../customers/customer.service';
import { EmailAddressService } from '../emails/emailaddresses.service';

@Component({
	selector: 'app-employeequoteform',
	styleUrls: [
		'./quoteform.component.css',
	],
	templateUrl: './quoteform.component.html',
})
export class QuoteFormComponent implements OnInit {
	@Input() insuranceLead: InsuranceLead;
	lead: UnfilteredInsuranceLead;
	customer: Customer;
	coApplicantExists = false;
	// lead: any;
	// customer: any;
	// emailAddress: any;
	existingEmails: CustomerEmail[];
	email = new FormControl('', [Validators.required, Validators.email]);
	users: User[];
	homeTypes: HomeType[];
	leadSources: LeadSource[];
	displayedLeadSources: LeadSource[];
	leadStatus: LeadStatus[];
	sidingTypes: SidingType[];
	roofTypes: RoofType[];
	states: State[];
	referrals: Referral[];
	phoneTypes: PhoneType[];
	dataLoaded = false;
	submitSuccessful;
	leadUpdateSuccess;
	customerUpdateSuccess;
	emailUpdateSuccess;
	constructor(
		private quoteFormService: QuoteFormService,
		private customerService: CustomerService,
		private emailAddressService: EmailAddressService,
		private referenceDataConverter: ReferenceDataConverter,
		private leadService: LeadService
	) {
		// this.emailAddress = '';
		// load ref data
		this.customer = new Customer();
		this.lead = new UnfilteredInsuranceLead();
		this.referenceDataConverter.loadData().subscribe(result => {
			this.users = this.referenceDataConverter.getUsers();
			this.homeTypes = this.referenceDataConverter.getHomeTypes();
			this.leadSources = this.referenceDataConverter.getLeadSources();
			this.leadSources = [this.leadSources[35], this.leadSources[86], this.leadSources[165]]; // id = 35, 86
			this.leadStatus = this.referenceDataConverter.getLeadStatus();
			this.sidingTypes = this.referenceDataConverter.getSidingTypes();
			this.roofTypes = this.referenceDataConverter.getRoofTypes();
			this.states = this.referenceDataConverter.getStates();
			this.referrals = this.referenceDataConverter.getReferrals();
			this.phoneTypes = this.referenceDataConverter.getPhoneTypes();
			this.dataLoaded = true;
		});
	}

	ngOnInit() {
		this.leadService.getLeadById(this.insuranceLead.id).subscribe(response => {
			this.lead = response;
		});
		// this.lead = {};
		this.customerService.getCustomerById(this.insuranceLead.customerId).subscribe(response => {
			this.customer = response;
		});
		this.emailAddressService.getEmailsByCustomerId('', 20, 0, this.insuranceLead.customerId).subscribe(response => {
			this.existingEmails = response['_embedded']['customeremailaddresses'];
		});
	}

	getErrorMessage() { // Error message if email is not valid
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}
	submit() { // submit user function.  Calls the api service and passes the User object to the call
		this.leadService.updateLead(this.lead).subscribe(response => {
			if (response.id) {
				this.leadUpdateSuccess = true;
			} else {
				this.leadUpdateSuccess = false;
			}
		});
		this.customerService.updateCustomer(this.customer).subscribe(response => {
			if (response.id) {
				this.customerUpdateSuccess = true;
			} else {
				this.customerUpdateSuccess = false;
			}
		});

		/*if (this.customer.email === undefined) {
			this.customer.email = '';
		}
		// set insurance lead source as other
		// this.insuranceLead.leadSourceId = '35';
		const lead = {
			'customer' : this.customer,
			'insuranceLead': this.lead };
		// this.leadService.addLead(lead);*/
	}

}

