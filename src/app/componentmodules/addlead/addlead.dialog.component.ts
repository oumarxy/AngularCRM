import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User, HomeType, LeadSource, LeadStatus, SidingType, RoofType, State, Referral, PhoneType } from '../../appdata/datamodels';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { LeadService } from '../leads/lead.service';

// Add dialog box
@Component({
	selector: 'app-addlead',
	templateUrl: './addlead.dialog.component.html',
	styleUrls: [
		'../leads/dialogboxes/dialog.component.css',
		'./addlead.component.css'
	],
})
export class AddLeadComponent {
	refdata = 'Lead'; // Title for dialog box
	// class variables to be added to database
	insuranceLead: any;
	customer: any;
	emailAddress: any;
	submitSuccessful = false;
	submitFailed = false;
	code = '';
	message = '';
	// form control to ensure added email is valid.  This can be done for all other fields
	email = new FormControl('', [Validators.required, Validators.email]);
	dataLoaded = false;
	// reference data fields
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

	constructor(
		private leadService: LeadService,
		private referenceDataConverter: ReferenceDataConverter) {
			this.insuranceLead = {};
			this.customer = {};
			this.emailAddress = '';
			// load ref data
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
	getErrorMessage() { // Error message if email is not valid
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}
	submitLead() { // submit user function.  Calls the api service and passes the User object to the call
		if (this.customer.email === undefined || this.customer.email === '') {
			this.submitFailed = true;
			this.submitSuccessful = false;
			this.message = 'Error: there was a problem with the email you entered';
			return;
		}
		// set insurance lead source as other
		// this.insuranceLead.leadSourceId = '35';
		const lead = {
			'customer' : this.customer,
			'insuranceLead': this.insuranceLead };
		this.leadService.addLeadAndCustomer(lead).subscribe(response => {
			if (response.status === 201) {
				this.submitSuccessful = true;
				this.submitFailed = false;
				this.message = 'Your lead was successfully added!';
			} else {
				this.submitFailed = true;
				this.submitSuccessful = false;
				this.message = 'Error: lead failed to submit (' + response.status + ')';
			}
		});
	}
}
