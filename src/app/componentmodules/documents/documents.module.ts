import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { DocumentsComponent } from './documents.component';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { DocumentService } from './documents.service';
import { SharedModule } from '../../shared/shared.module';
import { AddDocumentsComponent } from './adddocuments.dialog.component';
import { EditDocumentComponent } from './editdocuments.dialog.component';
import { DeleteDocumentComponent } from './deletedocuments.dialog.component';
import { PolicyDocumentsComponent } from './policydocuments.component';

@NgModule({
	imports: [
		SharedModule,
		MatDialogModule,
	  ],
	declarations: [
		DocumentsComponent,
		AddDocumentsComponent,
		EditDocumentComponent,
		DeleteDocumentComponent,
		PolicyDocumentsComponent
	],
	providers: [ AuthService, AuthGuard, DocumentService ],
	exports: [
		DocumentsComponent,
		AddDocumentsComponent,
		EditDocumentComponent,
		DeleteDocumentComponent,
		PolicyDocumentsComponent

	],
	entryComponents: [
		AddDocumentsComponent,
		EditDocumentComponent,
		DeleteDocumentComponent
	]
})
export class DocumentModule { }
