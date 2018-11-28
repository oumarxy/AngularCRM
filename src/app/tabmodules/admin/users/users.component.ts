import { OnInit, Component, ElementRef, ViewChild, Inject, AfterViewInit} from '@angular/core';
import { MatPaginator} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { UserService, UserDataSource } from './users.service';
import { tap } from 'rxjs/operators';
import { User, Role } from '../../../appdata/datamodels';
import { USERSDISPLAY } from '../../../appdata/tablesettings';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';
/**
 * @title Table retrieving data through HTTP
 */
@Component({
	selector: 'app-adminusertable',
	styleUrls: ['users.component.css'],
	templateUrl: 'users.component.html',
})
export class UserComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	selectedUser: User; // selected user (for editing.  Need to add logic where only 1 can be selected at a time)
	displaySettings = USERSDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: UserDataSource | null; // initialize a UserDataSource
	results: User[]; // User array of results for datasource
	message: string; // messages from EventEmitter buttons

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private userService: UserService,
		public dialog: MatDialog,
		private referenceDataConverter: ReferenceDataConverter) {}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.push('edit');
		this.displayedColumns.push('delete');
		this.dataSource = new UserDataSource(this.userService, this.paginator, this.referenceDataConverter);
		this.dataSource.loadUsers('', 10, 0);
	}


	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadUserPage())
		).subscribe();
	}

	loadUserPage() {
		this.dataSource.loadUsers('', this.paginator.pageSize, this.paginator.pageIndex);
	}

	edit(user: User) {
		const dialogRef = this.dialog.open(UserEditComponent, {
			data: { 'user' : user }
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadUserPage();
		});
	}

	delete(user: User) {
		const dialogRef = this.dialog.open(UserDeleteComponent, {
			data: { 'user' : user }
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.loadUserPage();
		});
	}

	add() {
		const dialogRef = this.dialog.open(UserAddComponent, {
			data: {}
		});
		// when the window is closed, refresh the table data
		dialogRef.afterClosed().subscribe(result => {
			this.loadUserPage();
		});
	}
}

// Add dialog box
@Component({
	selector: 'app-adduser',
	templateUrl: './add.dialog.component.html',
	styleUrls: [
		'./users.component.css'
	]
})
export class UserAddComponent {
	// Title for dialog box
	refdata = 'User';
	// old variable.  Can remove later
	submitted = false;
	// class variable to be added to database
	user: User;
	roles: Role[];
	// form control to ensure added email is valid.  This can be done for all other fields
	email = new FormControl('', [Validators.required, Validators.email]);
	constructor(
		public dialogRef: MatDialogRef<UserAddComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any,	// Generic dialog settings
		private userapiservice: UserService) {	// API service for adding users
			this.user = new User();
			this.userapiservice.getObservRoles().subscribe( resdata => {
				this.roles =  resdata;
			});
		}
	// Error message if email is not valid
	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}
	// submit user function.  Calls the api service and passes the User object to the call
	submitUser() {
		this.userapiservice.addUser(this.user);
	}
	// closes dialog window if clicked outside box
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
// Edit User component
@Component({
	selector: 'app-edituser',
	templateUrl: './edit.dialog.component.html',
	styleUrls: [
		'./users.component.css'
	]
  })
  export class UserEditComponent {
	editUser: User;
	user: User;
	roles: Role[];
	// array of changes.  This is a generic JSON array.  You do not pass an object here
	// Form control on email was removed.  Left it here in case it is added back
	email = new FormControl('', [Validators.required, Validators.email]);
	constructor(
	  	public dialogRef: MatDialogRef<UserEditComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private userservice: UserService,
		private referenceDataConverter: ReferenceDataConverter) {
			this.user = new User();	// new user created in the event of a PUT
			// this.roles = this.referenceDataConverter.getRoles();
			this.editUser = data.user;
		}

	onNoClick(): void {
	  this.dialogRef.close();
	}
	// call API service edit function
	submitEdits() {
		// merge objects (use this for a PUT call)
		Object.assign(this.editUser, this.user);  // merges new user to old user and maps over old fields
		// call the updateUser service.  Passes the changes array and the id of the user to be edited
		// this.userapiservice.updateUser(this.changes, this.editUser.id);
		this.userservice.updateUser(this.editUser);
	}

	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
		'';
	}
}
// Delete component
@Component({
	selector: 'app-deleteuser',
	templateUrl: './delete.dialog.component.html',
  })
  export class UserDeleteComponent {
	refdata = 'User';
	// selection array of all the id's to be deleted (for group delete)
	userToDelete: User;
	constructor(
		public dialogRef: MatDialogRef<UserDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private userapiservice: UserService) {
			this.userToDelete = data.user;
		}

	deleteUsers() {
		this.userapiservice.deleteUser(this.userToDelete);
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}

}
