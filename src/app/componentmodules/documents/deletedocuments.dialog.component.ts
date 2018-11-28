import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentService } from './documents.service';

// Delete component
@Component({
	selector: 'app-deletedocument',
	template: `<h2 mat-dialog-title>Delete selected item(s)?</h2>
				<mat-dialog-content>Are you sure?</mat-dialog-content>
				<mat-dialog-actions>
				<button mat-button mat-dialog-close>No</button>
				<!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
				<button mat-button [mat-dialog-close]="true" (click)="deleteDocument()" type="submit" color="warn">Yes</button>
				</mat-dialog-actions>`,
	styleUrls: []
  })
  export class DeleteDocumentComponent {
	constructor(
		public dialogRef: MatDialogRef<DeleteDocumentComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private documentRepoService: DocumentService) {}

	deleteDocument() {
		this.documentRepoService.deleteDocument(this.data.document).subscribe(response => response);
	}
	onNoClick(): void {
	  this.dialogRef.close();
	}

}
