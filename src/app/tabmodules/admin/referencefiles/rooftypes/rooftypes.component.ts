import { Component, Inject} from '@angular/core';
import { ROOFTYPEDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoofType } from '../../../../appdata/datamodels';
import { RoofTypeService } from './rooftypes.service';
@Component({
	selector: 'app-reference-rooftypes',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class RoofTypesComponent  {
	displaySettings = ROOFTYPEDISPLAY;
	dataPath = 'rooftypes';
	constructor(public dialog: MatDialog) {}


	add() {
		const dialogRef = this.dialog.open(AddRoofTypeComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addrooftype',
	templateUrl: './rooftypes.add.dialog.component.html',
	styleUrls: []
})
export class AddRoofTypeComponent {
	roofType: RoofType;
	constructor(
		public dialogRef: MatDialogRef<AddRoofTypeComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private roofTypeService: RoofTypeService) {	// API service for adding users
			this.roofType = new RoofType();
		}
	addRoofType() {
		this.roofType.id = this.data.totalElements;
		this.roofTypeService.addRoofType(this.roofType);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}


