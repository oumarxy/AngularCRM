import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../datatable.service';

@Component({ // Delete component
	selector: 'app-deletelead',
	templateUrl: './delete.dialog.component.html',
})
export class DeleteComponent {
	constructor(
		public dialogRef: MatDialogRef<DeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dataService: DataService) {
		}

	delete() {
		// this.dataService.deleteLead(element);
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
