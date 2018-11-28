import { Component, Inject} from '@angular/core';
import { INSURERDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Insurer } from '../../../../appdata/datamodels';
import { InsurerService } from './insurers.service';
@Component({
	selector: 'app-reference-insurer',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class InsurerComponent  {
	displaySettings = INSURERDISPLAY;
	dataPath = 'insurers';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddInsurerComponent, {
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
	selector: 'app-addinsurer',
	templateUrl: './insurers.add.dialog.component.html',
	styleUrls: []
})
export class AddInsurerComponent {
	insurer: Insurer;
	constructor(
		public dialogRef: MatDialogRef<AddInsurerComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private insurerService: InsurerService) {	// API service for adding users
			this.insurer = new Insurer();
		}
	addInsurer() {
		this.insurer.id = this.data.totalElements;
		this.insurerService.addInsurer(this.insurer);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}

