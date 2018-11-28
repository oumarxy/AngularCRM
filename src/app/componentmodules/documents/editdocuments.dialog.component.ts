import { Component, Inject } from '@angular/core';
import { FileStoreDocument } from '../../appdata/datamodels';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentService } from './documents.service';

// Edit User component
@Component({
	selector: 'app-editdocument',
	template: `<h2 mat-dialog-title>Edit Documents</h2>
				<mat-dialog-content>Edit fields and then click on save</mat-dialog-content>
				<div class="example-container">
					<form #editDocumentForm="ngForm">
						<mat-form-field hintLabel="File Name">
							<input matInput placeholder="{{ document.fileName }}" id="fileName" [(ngModel)]="document.fileName" name="fileName">
						</mat-form-field>
					</form>
				</div>
				<mat-dialog-actions>
					<button mat-button mat-dialog-close>Cancel</button>
					<button mat-button [mat-dialog-close]="true" (click)="submitEdits()">Save Changes</button>
				</mat-dialog-actions>`,
	styleUrls: []
  })
  export class EditDocumentComponent {
	document: FileStoreDocument;
	constructor(
	  	public dialogRef: MatDialogRef<EditDocumentComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private documentRepoService: DocumentService) {
			this.document = new FileStoreDocument();
			this.data.document = data.document;
		}

	onNoClick(): void {
	  this.dialogRef.close();
	}

	submitEdits() {
		this.documentRepoService.updateDocument(this.document).subscribe(response => {
		});
	}
}
