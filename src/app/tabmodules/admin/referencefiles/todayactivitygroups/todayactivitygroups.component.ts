import { Component, Inject} from '@angular/core';
import { TODAYACTIVITYGROUPDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodayActivityGroup } from '../../../../appdata/datamodels';
import { TodayActivityGroupService } from './todayactivitygroups.service';
@Component({
	selector: 'app-reference-todayactivitygroups',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class TodayActivityGroupComponent  {
	displaySettings = TODAYACTIVITYGROUPDISPLAY;
	dataPath = 'todayactivitygroups';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddTodayActivityGroupComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addtodayactivitygroup',
	templateUrl: './todayactivitygroups.add.dialog.component.html',
	styleUrls: []
})
export class AddTodayActivityGroupComponent {
	todayActivityGroup: TodayActivityGroup;
	constructor(
		public dialogRef: MatDialogRef<AddTodayActivityGroupComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private todayActivityGroupService: TodayActivityGroupService) {	// API service for adding users
			this.todayActivityGroup = new TodayActivityGroup();
		}
	addTodayActivityGroup() {
		this.todayActivityGroup.id = this.data.totalElements;
		this.todayActivityGroupService.addTodayActivityGroup(this.todayActivityGroup);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}

