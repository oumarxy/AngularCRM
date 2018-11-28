import { Component, Inject} from '@angular/core';
import { ZONEDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Zone } from '../../../../appdata/datamodels';
import { ZoneService } from './zones.service';
@Component({
	selector: 'app-reference-zones',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class ZonesComponent  {
	displaySettings = ZONEDISPLAY;
	dataPath = 'zones';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddZoneComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addzone',
	templateUrl: './zones.add.dialog.component.html',
	styleUrls: []
})
export class AddZoneComponent {
	zone: Zone;
	constructor(
		public dialogRef: MatDialogRef<AddZoneComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private zoneService: ZoneService) {	// API service for adding users
			this.zone = new Zone();
		}
	addZone() {
		this.zone.id = this.data.totalElements;
		this.zoneService.addZone(this.zone);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
