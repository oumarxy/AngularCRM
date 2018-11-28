import { Component, Inject} from '@angular/core';
import { SIDINGTYPEDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SidingType } from '../../../../appdata/datamodels';
import { SidingTypeService } from './sidingtypes.service';
@Component({
	selector: 'app-reference-sidingtypes',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class SidingTypesComponent  {
	displaySettings = SIDINGTYPEDISPLAY;
	dataPath = 'sidingtypes';
	constructor(public dialog: MatDialog) {}


	add() {
		const dialogRef = this.dialog.open(AddSidingTypeComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addsidingtype',
	templateUrl: './sidingtypes.add.dialog.component.html',
	styleUrls: []
})
export class AddSidingTypeComponent {
	// Title for dialog box
	refdata = 'SidingType';
	sidingType: SidingType;
	constructor(
		public dialogRef: MatDialogRef<AddSidingTypeComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private sidingTypeService: SidingTypeService) {	// API service for adding users
			this.sidingType = new SidingType();
		}
	addSidingType() {
		this.sidingType.id = this.data.totalElements;
		this.sidingTypeService.addSidingType(this.sidingType);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
