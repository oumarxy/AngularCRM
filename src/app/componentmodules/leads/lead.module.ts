import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesAndActivitiesModule } from '../notesandactivities/notesandactivities.module';
import { SharedModule } from '../../shared/shared.module';
import { DocumentModule } from '../documents/documents.module';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { EmailAddressModule } from '../emails/emailaddress.module';
import { ReminderModule } from '../reminders/reminder.module';
import { PolicyModule } from '../policy/policy.module';
import { CustomerModule } from '../customers/customer.module';
import { CustomerService } from '../customers/customer.service';
import { LeadFilterComponent } from './dialogboxes/filter.dialog.component';
import { LeadAssignComponent } from './dialogboxes/assignleads.dialog.component';
import { LeadDeleteComponent } from './dialogboxes/delete.dialog.component';
import { LeadComponent } from './lead.component';
import { QuoteFormModule } from '../employeequoteform/quoteform.module';
import { LeadEditComponent } from './dialogboxes/edit.dialog.component';
import { LeadTableComponent } from './leadtable.component';
import { LeadDeleteSelectionComponent } from './dialogboxes/delete.selection.dialog.component';
@NgModule({
	imports: [
		SharedModule,
		HttpClientModule,
		DocumentModule,
		NotesAndActivitiesModule,
		EmailAddressModule,
		ReminderModule,
		CustomerModule,
		PolicyModule,
		QuoteFormModule
	  ],
	declarations: [
		LeadComponent,
		LeadFilterComponent,
		LeadAssignComponent,
		LeadDeleteComponent,
		LeadDeleteSelectionComponent,
		LeadEditComponent,
		LeadTableComponent
	],
	bootstrap: [  ],
	providers: [
		AuthService,
		AuthGuard,
		ReferenceDataConverter,
		CustomerService,
	],
	exports: [
		DocumentModule,
		NotesAndActivitiesModule,
		EmailAddressModule,
		ReminderModule,
		CustomerModule,
		PolicyModule,
		QuoteFormModule,
		LeadComponent,
		LeadFilterComponent,
		LeadAssignComponent,
		LeadDeleteComponent,
		LeadEditComponent,
		LeadTableComponent,
		LeadDeleteSelectionComponent,

	],
	entryComponents: [
		LeadComponent,
		LeadFilterComponent,
		LeadAssignComponent,
		LeadDeleteComponent,
		LeadEditComponent,
		LeadDeleteSelectionComponent,

	]
})
export class LeadModule { }
