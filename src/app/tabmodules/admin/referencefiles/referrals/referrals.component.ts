import { Component, Inject} from '@angular/core';
import { REFFERALSDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Referral } from '../../../../appdata/datamodels';
import { ReferralService } from './referrals.service';
@Component({
	selector: 'app-reference-referrals',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class ReferralComponent  {
	displaySettings = REFFERALSDISPLAY;
	dataPath = 'referrals';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddReferralComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addreferral',
	templateUrl: './referrals.add.dialog.component.html',
	styleUrls: []
})
export class AddReferralComponent {
	referral: Referral;
	constructor(
		public dialogRef: MatDialogRef<AddReferralComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private referralService: ReferralService) {	// API service for adding users
			this.referral = new Referral();
		}
	addReferral() {
		this.referral.id = this.data.totalElements;
		this.referralService.addReferral(this.referral);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}

