import { Component, Inject} from '@angular/core';
import { LEADSTATUSDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeadStatus } from '../../../../appdata/datamodels';
import { LeadStatusService } from './leadstatus.service';
@Component({
	selector: 'app-reference-leadstatuses',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class LeadStatusComponent  {
	displaySettings = LEADSTATUSDISPLAY;
	dataPath = 'leadstatuses';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddLeadStatusComponent, {
			data: {
			}
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addleadstatus',
	templateUrl: './leadstatus.add.dialog.component.html',
	styleUrls: []
})
export class AddLeadStatusComponent {
	leadStatus: LeadStatus;
	constructor(
		public dialogRef: MatDialogRef<AddLeadStatusComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private leadStatusService: LeadStatusService) {	// API service for adding users
			this.leadStatus = new LeadStatus();
		}
	addLeadStatus() {
		this.leadStatus.id = this.data.totalElements;
		this.leadStatusService.addLeadStatus(this.leadStatus);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
