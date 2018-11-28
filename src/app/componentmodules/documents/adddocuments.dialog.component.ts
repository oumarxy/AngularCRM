import { Component, AfterViewInit, OnInit, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { InsuranceLead } from '../../appdata/datamodels';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { DocumentUploadService } from '../../services/documentupload.service';
import { LeadService } from '../leads/lead.service';

@Component({
	selector: 'app-importdocument',
	styles: [
		`mat-dialog-content {
			min-width: 600px;
			min-height: 400px;
		}
		.add-files-btn {
			float: right;
		  }
		  :host {
			height: 100%;
			display: flex;
			flex: 1;
			flex-direction: column;
		  }
		  .actions {
			justify-content: flex-end;
		  }
		  .container {
			height: 100%;
		  }`
	],
	template: `<input type="file" #file style="display: none" (change)="onFilesAdded($event)" multiple />
					<div class="container" fxLayout="column" fxLayoutAlign="space-evenly stretch">
					<h1 mat-dialog-title>Upload Files</h1>
					<div>
						<button [disabled]="uploading || uploadSuccessful" mat-raised-button color="primary" class="add-files-btn" (click)="addFiles()">
						Add Files
						</button>
					</div>
					<!-- This is the content of the dialog, containing a list of the files to upload -->
					<mat-dialog-content fxFlex>
						<mat-list>
						<mat-list-item *ngFor="let file of files">
							<h4 mat-line>{{file.name}}</h4>
							<mat-progress-bar *ngIf="progress" mode="determinate" [value]="progress[file.name].progress | async"></mat-progress-bar>
						</mat-list-item>
						</mat-list>
					</mat-dialog-content>
					<!-- This are the actions of the dialog, containing the primary and the cancel button-->
					<mat-dialog-actions class="actions">
						<button *ngIf="showCancelButton" mat-button mat-dialog-close>Cancel</button>
						<button mat-raised-button color="primary" [disabled]="!canBeClosed" (click)="closeDialog()">{{primaryButtonText}}</button>
					</mat-dialog-actions>
					</div>`,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class AddDocumentsComponent implements AfterViewInit, OnInit {
	selectedLead: InsuranceLead;
	@ViewChild('documentDisplay', {read: ElementRef}) documentDisplay: ElementRef;
	@ViewChild('file') file;
	public files: Set<File> = new Set();

	// state variables
	progress;
	canBeClosed = true;
	primaryButtonText = 'Upload';
	showCancelButton = true;
	uploading = false;
	uploadSuccessful = false;

	constructor(
		public dialogRef: MatDialogRef<AddDocumentsComponent>,	// same shit as above
	  	@Inject(MAT_DIALOG_DATA) public data: any,
	  	private http: HttpClient,
		private leadService: LeadService,
		public dialog: MatDialog,
		private referenceDataConverter: ReferenceDataConverter,
		private renderer: Renderer2,
		public uploadService: DocumentUploadService) {
			this.selectedLead = data.lead;
	}
	ngOnInit() {}

	ngAfterViewInit() {
	}

	addFiles() {
		this.file.nativeElement.click();
	}

	onFilesAdded(event) {
		const files: { [key: string]: File } = this.file.nativeElement.files;
		// tslint:disable-next-line:forin
		for (const key in files) {
			// tslint:disable-next-line:radix
			if (!isNaN(parseInt(key))) {
				this.files.add(files[key]);
			}
		}
	}

	closeDialog() {
		// if everything was uploaded already, just close the dialog
		if (this.uploadSuccessful) {
		  	return this.dialogRef.close();
		}
		// set the component state to "uploading"
		this.uploading = true;
		// start the upload and save the progress map
		this.progress = this.uploadService.upload(this.files, this.selectedLead);
		// convert the progress map into an array
		const allProgressObservables = [];
		// tslint:disable-next-line:forin
		for (const key in this.progress) {
		  	allProgressObservables.push(this.progress[key].progress);
		}
		// Adjust the state variables
		// The OK-button should have the text "Finish" now
		this.primaryButtonText = 'Finish';
		// The dialog should not be closed while uploading
		this.canBeClosed = false;
		this.dialogRef.disableClose = true;
		// Hide the cancel-button
		this.showCancelButton = false;
		// When all progress-observables are completed...
		forkJoin(allProgressObservables).subscribe(end => {
			// ... the dialog can be closed again...
			this.canBeClosed = true;
			this.dialogRef.disableClose = false;
			// ... the upload was successful...
			this.uploadSuccessful = true;
			// ... and the component is no longer uploading
			this.uploading = false;
		});
	}
}

export class DocumentData {
	customerId: string;
	insuranceLeadId: string;
	policyId: string;
	contentBytes: string;
	contentType: string;
	dateTimeLastModified: string;
	name: string;
	size: number;
}

