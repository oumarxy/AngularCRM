import { Component, Inject} from '@angular/core';
import { ROLESDISPLAY } from '../../../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../../../../appdata/datamodels';
import { RoleService } from './roles.service';
@Component({
	selector: 'app-reference-roles',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}" [add]="add"></app-datatable>`,
})
export class RoleComponent  {
	displaySettings = ROLESDISPLAY;
	dataPath = 'roles';
	constructor(public dialog: MatDialog) {}

	add() {
		const dialogRef = this.dialog.open(AddRoleComponent, {
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-addrole',
	templateUrl: './roles.add.dialog.component.html',
	styleUrls: []
})
export class AddRoleComponent {
	role: Role;
	constructor(
		public dialogRef: MatDialogRef<AddRoleComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private roleService: RoleService) {	// API service for adding users
			this.role = new Role();
		}
	addRole() {
		this.role.id = this.data.totalElements;
		this.roleService.addRole(this.role);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}

