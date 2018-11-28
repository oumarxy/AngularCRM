import { OnInit, Component, ElementRef, ViewChild, Inject, AfterViewInit, Renderer2, Input } from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { FileStoreDocument, InsuranceLead, Policy } from '../../appdata/datamodels';
import { DOCUMENTDISPLAY } from '../../appdata/tablesettings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { tap } from 'rxjs/operators';
import { DocumentService, DocumentDataSource } from './documents.service';
import { EditDocumentComponent } from './editdocuments.dialog.component';
import { DeleteDocumentComponent } from './deletedocuments.dialog.component';
import { AddDocumentsComponent } from './adddocuments.dialog.component';
/**
 * @title Table retrieving data through HTTP
 */
@Component({
	selector: 'app-policydocuments',
	styleUrls: [
		'./documents.component.css'
	],
	templateUrl: './documents.component.html',
})
export class PolicyDocumentsComponent implements OnInit, AfterViewInit {
	@Input() policy: Policy;
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	displaySettings = DOCUMENTDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: DocumentDataSource | null; // initialize a UserDataSource
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('documentDisplay', {read: ElementRef}) documentDisplay: ElementRef;

	constructor(
		private documentRepoService: DocumentService,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<PolicyDocumentsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private renderer: Renderer2) {
		}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.push('view');
		this.displayedColumns.push('edit');
		this.displayedColumns.push('delete');
		this.dataSource = new DocumentDataSource(this.documentRepoService, this.paginator, this.sort);
		// this.dataSource.loadDocumentsById(this.data.leadId);
		this.loadDocumentPage();
	}


	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadDocumentPage())
		).subscribe();
	}

	loadDocumentPage() {
		this.dataSource.loadDocumentsByPolicyId('', 10, 0, this.policy.id);
	}

	addDocuments() {
		const dialogRef = this.dialog.open(AddDocumentsComponent, {
			data: { 'policy': this.policy }
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadDocumentPage();
		});
	}

	edit(document: FileStoreDocument) {
		const dialogRef = this.dialog.open(EditDocumentComponent, {
			data: {
				'document': document
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadDocumentPage();
		});
	}

	delete(document: FileStoreDocument) {
		const dialogRef = this.dialog.open(DeleteDocumentComponent, {
			data: {
				'document': document
			}
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.loadDocumentPage();
		});
	}

	view(document: FileStoreDocument) {
		this.documentRepoService.getFile(document.id).subscribe(file => {
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'border', '0');
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'top', '0px');
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'left', '0px');
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'bottom', '0px');
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'right', '0px');
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'width', '100%');
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'height', '100%');
			this.renderer.setStyle(this.documentDisplay.nativeElement, 'min-height', '300px');
			this.renderer.setProperty(this.documentDisplay.nativeElement, 'src', 'data:application/pdf;base64,' + file.contentBytes);
		});
	}

}
