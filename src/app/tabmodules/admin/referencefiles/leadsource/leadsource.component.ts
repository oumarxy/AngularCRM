import { Component, Inject} from '@angular/core';
import { LEADSOURCEDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeadSource } from '../../../../appdata/datamodels';
import { LeadSourceService } from './leadsource.service';
@Component({
	selector: 'app-reference-leadsources',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class LeadSourceComponent  {
	displaySettings = LEADSOURCEDISPLAY;
	dataPath = 'leadsources';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddLeadSourceComponent, {
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
	selector: 'app-addleadsource',
	templateUrl: './leadsource.add.dialog.component.html',
	styleUrls: []
})
export class AddLeadSourceComponent {
	leadSource: LeadSource;
	constructor(
		public dialogRef: MatDialogRef<AddLeadSourceComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private leadSourceService: LeadSourceService) {	// API service for adding users
			this.leadSource = new LeadSource();
		}
	addLeadSource() {
		this.leadSource.id = this.data.totalElements;
		this.leadSourceService.addLeadSource(this.leadSource);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
