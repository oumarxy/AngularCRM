import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule  } from '@angular/common/http';
import { UserService } from './users/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
	UserAddComponent,
	UserEditComponent,
	UserDeleteComponent,
	UserComponent
} from './users/users.component';
import {
	EmailTemplateComponent,
	EditEmailTemplateComponent,
	AddEmailTemplateComponent,
	DeleteEmailTemplateComponent
} from './emailtemplates/emailtemplates.component';
import { EmailTemplateService } from './emailtemplates/emailtemplates.service';
import { TinyMceModule, tinymceDefaultSettings } from 'angular-tinymce';
import { EmailLogRepoComponent } from './emaillogs/emaillog.component';
import { SharedModule } from '../../shared/shared.module';
import { DataTableModule } from '../../shared/datatable/datatable.module';
import { AuthGuard } from '../../services/authorization.guard.service';
import { AuthService } from '../../services/authorization.service';
import { NotesRepoComponent } from './notesrepo/notesrepo.component';
import { EmailRepoComponent } from './emailrepo/emailrepo.component';
import { ReferenceFilesModule } from './referencefiles/referencefiles.module';

@NgModule({
	imports: [
		SharedModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		MatIconModule,
		TinyMceModule.forRoot(tinymceDefaultSettings),
		DataTableModule,
		ReferenceFilesModule,
	  ],
	declarations: [
		AdminComponent,
		UserComponent, UserAddComponent, UserEditComponent, UserDeleteComponent,
		EmailTemplateComponent, EditEmailTemplateComponent, AddEmailTemplateComponent, DeleteEmailTemplateComponent,
		EmailLogRepoComponent,
		NotesRepoComponent,
		EmailRepoComponent
	],
	providers: [
		UserService,
		EmailTemplateService,
		AuthGuard,
		AuthService
	],
	exports: [
		AdminComponent,
		UserComponent, UserAddComponent, UserEditComponent, UserDeleteComponent,
		EmailTemplateComponent, EditEmailTemplateComponent, AddEmailTemplateComponent, DeleteEmailTemplateComponent,
		EmailLogRepoComponent,
		NotesRepoComponent,
		EmailRepoComponent

	],
	entryComponents: [
		UserAddComponent, UserEditComponent, UserDeleteComponent,
		EditEmailTemplateComponent, AddEmailTemplateComponent, DeleteEmailTemplateComponent,
	]
})
export class AdminModule { }
