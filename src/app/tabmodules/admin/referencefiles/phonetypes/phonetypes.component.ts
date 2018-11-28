import { Component, Inject} from '@angular/core';
import { PHONETYPEDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhoneType } from '../../../../appdata/datamodels';
import { PhoneTypeService } from './phonetypes.service';
@Component({
	selector: 'app-reference-phonetypes',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class PhoneTypeComponent  {
	displaySettings = PHONETYPEDISPLAY;
	dataPath = 'phonetypes';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddPhoneTypeComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addphonetype',
	templateUrl: './phonetypes.add.dialog.component.html',
	styleUrls: []
})
export class AddPhoneTypeComponent {
	phoneType: PhoneType;
	constructor(
		public dialogRef: MatDialogRef<AddPhoneTypeComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private phoneTypeService: PhoneTypeService) {	// API service for adding users
			this.phoneType = new PhoneType();
		}
	addPhoneType() {
		this.phoneType.id = this.data.totalElements;
		this.phoneTypeService.addPhoneType(this.phoneType);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
