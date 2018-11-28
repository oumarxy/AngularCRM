import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Add dialog box
@Component({
	selector: 'app-customerclearfilters',
	templateUrl: './clearcustomerfilters.dialog.component.html',
	styleUrls: [
		'../css/customer.component.css'
	]
})
export class CustomerClearFilterComponent {
	filterList = {}; // list of filtered data
	@Output() filterEvent = new EventEmitter(); // event emitter to send back to parent

	constructor(
		public dialogRef: MatDialogRef<CustomerClearFilterComponent>,	// Grabs the component
		@Inject(MAT_DIALOG_DATA) public data: any) {} // Generic dialog settings
	clearFilters() { // clear filters
		this.filterEvent.emit(this.filterList);
	}
	onNoClick(): void { // closes dialog window if clicked outside box
	  this.dialogRef.close();
	}
}
