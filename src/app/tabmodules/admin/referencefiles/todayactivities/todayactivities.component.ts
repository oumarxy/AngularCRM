import { Component, Inject} from '@angular/core';
import { TODAYACTIVITYDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodayActivity } from '../../../../appdata/datamodels';
import { TodayActivityService } from './todayactivity.service';
@Component({
	selector: 'app-reference-todayactivities',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class TodayActivityComponent  {
	displaySettings = TODAYACTIVITYDISPLAY;
	dataPath = 'todayactivities';
	constructor(public dialog: MatDialog) {}


	add() {
		const dialogRef = this.dialog.open(AddTodayActivityComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addtodayactivity',
	templateUrl: './todayactivities.add.dialog.component.html',
	styleUrls: []
})
export class AddTodayActivityComponent {
	todayActivity: TodayActivity;
	constructor(
		public dialogRef: MatDialogRef<AddTodayActivityComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private todayActivityService: TodayActivityService) {	// API service for adding users
			this.todayActivity = new TodayActivity();
		}
	addTodayActivity() {
		this.todayActivity.id = this.data.totalElements;
		this.todayActivityService.addTodayActivity(this.todayActivity);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
