import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeadService } from '../lead.service';
import { UnfilteredInsuranceLead } from '../../../appdata/datamodels';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';

@Component({ // Edit User component
	selector: 'app-editlead',
	templateUrl: './edit.dialog.component.html',
	styleUrls: ['./dialog.component.css']
  })
  export class LeadEditComponent implements OnInit {
	insuranceLead: UnfilteredInsuranceLead;
	email = new FormControl('', [Validators.required, Validators.email]);
	// reference data fields
	users: String[];
	homeTypes: String[];
	leadSources: String[];
	leadStatus: String[];
	sidingTypes: String[];
	roofTypes: String[];
	states: String[];
	referrals: String[];
	phoneTypes: String[];

	constructor(
	  	public dialogRef: MatDialogRef<LeadEditComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private leadService: LeadService,
		private referenceDataConverter: ReferenceDataConverter) {
			this.users = [];
			this.leadStatus = [];
			this.homeTypes = [];
			this.leadSources = [];
			this.sidingTypes = [];
			this.roofTypes = [];
			this.states = [];
			this.referrals = [];
			this.phoneTypes = [];
			this.insuranceLead = new UnfilteredInsuranceLead();
			// this.insuranceLead = new InsuranceLead();
			this.referenceDataConverter.getUsers().forEach(user => {
				this.users.push(user.userName);
			});
			this.referenceDataConverter.getHomeTypes().forEach(hometype => {
				this.homeTypes.push(hometype.label);
			});
			this.referenceDataConverter.getLeadSources().forEach(leadSource => {
				this.leadSources.push(leadSource.label);
			});
			this.referenceDataConverter.getLeadStatus().forEach(leadStatus => {
				this.leadStatus.push(leadStatus.label);
			});
			this.referenceDataConverter.getSidingTypes().forEach(sidingType => {
				this.sidingTypes.push(sidingType.label);
			});
			this.referenceDataConverter.getRoofTypes().forEach(roofType => {
				this.roofTypes.push(roofType.label);
			});
			this.referenceDataConverter.getStates().forEach(state => {
				this.states.push(state.label);
			});
			this.referenceDataConverter.getReferrals().forEach(referral => {
				this.referrals.push(referral.label);
			});
			this.referenceDataConverter.getPhoneTypes().forEach(phoneType => {
				this.phoneTypes.push(phoneType.label);
			});
		}

	ngOnInit() {
		this.leadService.getLeadById(this.data.insuranceLead.id).subscribe(response => {
			this.insuranceLead = response;
		});
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}
	// call API service edit function
	submitEdits() {
		// merge objects (use this for a PUT call)
		if (this.insuranceLead.estHomeContentsValue) {
			this.insuranceLead.estHomeContentsValue = this.insuranceLead.estHomeContentsValue.replace(/\D/g, '');
		}
		if (this.insuranceLead.estHomeValue) {
			this.insuranceLead.estHomeValue = this.insuranceLead.estHomeValue.replace(/\D/g, '');
		}
		// call the updateUser service.  Passes the changes array and the id of the user to be edited
		this.leadService.updateLead(this.insuranceLead).subscribe(res => res);
	}

	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}
}
