import { Component, Inject} from '@angular/core';
import { HOMETYPEDISPLAY } from '../../../../appdata/tablesettings';
import { HomeType } from '../../../../appdata/datamodels';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HomeTypeService } from './hometypes.service';
@Component({
	selector: 'app-reference-hometype',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class HomeTypeComponent  {
	displaySettings = HOMETYPEDISPLAY;
	dataPath = 'hometypes';
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	constructor(private homeTypeService: HomeTypeService, public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddHomeTypeComponent, {});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {});
	}
}

// Add dialog box
@Component({
	selector: 'app-addhometype',
	templateUrl: './hometypes.add.dialog.component.html',
	styleUrls: []
})
export class AddHomeTypeComponent {
	homeType: HomeType;
	constructor(
		public dialogRef: MatDialogRef<AddHomeTypeComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private homeTypeService: HomeTypeService) {	// API service for adding users
			this.homeType = new HomeType();
		}
	addHomeType() {
		this.homeType.id = this.data.totalElements;
		this.homeTypeService.addHomeType(this.homeType);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
