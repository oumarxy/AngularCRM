import { NgModule } from '@angular/core';
import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { EmailService } from './email.service';
import { PDFMapperComponent } from './pdfmapper.component';
import { TinyMceModule, tinymceDefaultSettings } from 'angular-tinymce';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
@NgModule({
	imports: [
		SharedModule,
		EmailRoutingModule,
		BrowserAnimationsModule,
		TinyMceModule.forRoot(tinymceDefaultSettings)
	  ],
	declarations: [
		EmailComponent,
		PDFMapperComponent
	],
	providers: [ AuthService, AuthGuard, HttpClient, EmailService ],
	exports: [
		EmailComponent
	],
	entryComponents: [ PDFMapperComponent]
})
export class EmailModule { }
