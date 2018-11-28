import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { EmailAddressComponent } from './emailaddress.component';
import { EmailAddressEditComponent } from './editemailaddress.component';
import { EmailAddressDeleteComponent } from './deleteemailaddress.component';
import { EmailAddressService } from './emailaddresses.service';

@NgModule({
	imports: [
		SharedModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		MatIconModule,
		BrowserAnimationsModule,
	],
	declarations: [
		EmailAddressComponent,
		EmailAddressEditComponent,
		EmailAddressDeleteComponent
	],
	bootstrap: [ EmailAddressComponent ],
	providers: [ EmailAddressService ],
	exports: [
		EmailAddressComponent,
		EmailAddressEditComponent,
		EmailAddressDeleteComponent
	],
	entryComponents: [
		EmailAddressEditComponent,
		EmailAddressDeleteComponent
	]
})
export class EmailAddressModule { }
