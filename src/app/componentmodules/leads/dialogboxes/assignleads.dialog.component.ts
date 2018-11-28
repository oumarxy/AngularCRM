import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InsuranceLead, User } from '../../../appdata/datamodels';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';
import { LeadService } from '../lead.service';
import { EMAILRELAYPATH, EMAILRELAYKEY } from '../../../services/services.config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../tabmodules/admin/users/users.service';

// Add dialog box
@Component({
	selector: 'app-assignleads',
	templateUrl: './assignleads.dialog.component.html',
	styleUrls: [
		'./dialog.component.css'
	]
})
export class LeadAssignComponent {
	refdata = 'Lead'; // Title for dialog box
	insuranceleads: InsuranceLead[];
	selection = [];
	selectionString;
	users: User[];
	newId: string;
	email;
	constructor(
		public dialogRef: MatDialogRef<LeadAssignComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private leadservice: LeadService,
		private userService: UserService,
		private http: HttpClient,
		private referenceDataConverter: ReferenceDataConverter) {
			this.newId = '';
			this.users = this.referenceDataConverter.getUsers();
			this.selection = data.selection;
		}
	assignLeads() { // submit user function.  Calls the api service and passes the User object to the call
		this.selection.forEach(element => {
			element.userId = this.newId;
			this.leadservice.updateLead(element);
		});
		this.sendAssignmentEmail();
	}
	onNoClick(): void { // closes dialog window if clicked outside box
	  this.dialogRef.close();
	}

	sendAssignmentEmail() {
		this.selectionString = '';
		this.selection.forEach(element => {
			this.selectionString += element.firstName + ' ' + element.lastName + ' (ID: ' + element.id + ')\n';
		});
		this.userService.getUserById(this.newId).subscribe(res => {
			this.email = {
				'to' : res.email,
				'from':	'###############',
				'subject': 'You have been assigned new leads!',
				'content': 'New leads have been assigned to you by '
				+ JSON.parse(localStorage.getItem('user')).firstName
				+ ' ' + JSON.parse(localStorage.getItem('user')).lastName
				+ '.  Their ids are: ' + this.selectionString
			};
			return this.http.post(EMAILRELAYPATH, this.email, {
				headers: new HttpHeaders({
					'Accept': 'application/json',
					'Content-type': 'application/json',
					'x-api-key': EMAILRELAYKEY
				})
			}).map(response => {
			}).subscribe(emailsentresponse => {
			});
		});
	}
}
