import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DeadLeadReasonService } from './deadleadreasons.service';
import { DEADLEADREASONSDISPLAY } from '../../../../appdata/tablesettings';
import { DeadLeadReason } from '../../../../appdata/datamodels';
@Component({
	selector: 'app-reference-deadleadreason',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class DeadLeadReasonsComponent  {
	displaySettings = DEADLEADREASONSDISPLAY;
	dataPath = 'deadleadreasons';
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	constructor(private deadLeadReasonService: DeadLeadReasonService, public dialog: MatDialog) {}


	add() {
		const dialogRef = this.dialog.open(AddDeadLeadReasonComponent, {});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {});
	}
}

// Add dialog box
@Component({
	selector: 'app-adddeadleadreason',
	templateUrl: './deadleadreasons.add.dialog.component.html',
	styleUrls: []
})
export class AddDeadLeadReasonComponent {
	deadLeadReason: DeadLeadReason;
	constructor(
		public dialogRef: MatDialogRef<AddDeadLeadReasonComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private deadLeadReasonService: DeadLeadReasonService) {	// API service for adding users
			this.deadLeadReason = new DeadLeadReason();
		}
	addDeadLeadReason() {
		this.deadLeadReason.id = this.data.totalElements;
		this.deadLeadReasonService.addDeadLeadReason(this.deadLeadReason);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}

