import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeadService } from '../lead.service';
import { User, HomeType, LeadSource, LeadStatus, SidingType, RoofType, Referral, State, PhoneType } from '../../../appdata/datamodels';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';


// Add dialog box
@Component({
	selector: 'app-leadfilters',
	templateUrl: './filter.dialog.component.html',
	styleUrls: [
		'./dialog.component.css'
	]
})
export class LeadFilterComponent {
	refdata = 'Lead'; // Title for dialog box
	@Output() filterEvent = new EventEmitter(); // event emitter to send back to parent
	// filter format
	// {“customer”:{“key”:”value”,…}, “insuranceLead”:{“key”:”value”,…}, “emailAddress”:”addressString”}
	customerFilters: any = {};
	insuranceLeadFilters: any = {};
	emailAddress: any;
	filterList: any = {};
	// filterObject: Filters;
	// reference data loads
	users: User[];
	homeTypes: HomeType[];
	leadSources: LeadSource[];
	leadStatus: LeadStatus[];
	sidingTypes: SidingType[];
	roofTypes: RoofType[];
	referrals: Referral[];
	states: State[];
	phoneTypes: PhoneType[];
	dataLoaded = false;

	constructor(
		public dialogRef: MatDialogRef<LeadFilterComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private leadService: LeadService,
		private referenceDataConverter: ReferenceDataConverter) {
			this.referenceDataConverter.loadData().subscribe(result => {
				this.users = this.referenceDataConverter.getUsers();
				this.homeTypes = this.referenceDataConverter.getHomeTypes();
				this.leadSources = this.referenceDataConverter.getLeadSources();
				// this.leadSources = [this.leadSources[35], this.leadSources[86], this.leadSources[165]]; // id = 35, 86
				this.leadStatus = this.referenceDataConverter.getLeadStatus();
				this.sidingTypes = this.referenceDataConverter.getSidingTypes();
				this.roofTypes = this.referenceDataConverter.getRoofTypes();
				this.states = this.referenceDataConverter.getStates();
				this.referrals = this.referenceDataConverter.getReferrals();
				this.phoneTypes = this.referenceDataConverter.getPhoneTypes();
				this.dataLoaded = true;
			});
		}
	addFilters() { // submit user function.  Calls the api service and passes the User object to the call
		const filters = {
			'customer' : this.customerFilters,
			'insuranceLead': this.insuranceLeadFilters,
			'emailAddress': this.emailAddress };
		this.filterEvent.emit(filters);	// pass filters back up to parent
	}
	onNoClick(): void { // closes dialog window if clicked outside box
	  this.dialogRef.close();
	}
}
