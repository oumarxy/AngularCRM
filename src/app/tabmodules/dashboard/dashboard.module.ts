import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PolicyModule } from '../../componentmodules/policy/policy.module';
import { DocumentModule } from '../../componentmodules/documents/documents.module';
import { NotesAndActivitiesModule } from '../../componentmodules/notesandactivities/notesandactivities.module';
import { DashboardComponent } from './dashboard.component';
import { MyLeadsComponent } from './myleadtable/myleadtable.component';
import { MyUserComponent } from './myuserpage/myuserpage.component';
import { MyReminderComponent } from './myreminders/myreminders.component';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { DashboardService } from './dashboard.service';
import { ReminderService } from '../../componentmodules/reminders/reminders.service';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { EmailAddressModule } from '../../componentmodules/emails/emailaddress.module';
import { ReminderModule } from '../../componentmodules/reminders/reminder.module';
import { LeadModule } from '../../componentmodules/leads/lead.module';
import { MyPolicyDatabaseComponent } from './mypolicytable/policytable.component';
import { AddLeadModule } from '../../componentmodules/addlead/addlead.module';


@NgModule({
	imports: [
		SharedModule,
		DashboardRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		PolicyModule,
		DocumentModule,
		NotesAndActivitiesModule,
		EmailAddressModule,
		ReminderModule,
		LeadModule,
		AddLeadModule

	  ],
	declarations: [
		DashboardComponent,
		MyLeadsComponent,
		MyUserComponent,
		MyReminderComponent,
		MyPolicyDatabaseComponent,
	],
	providers: [
		AuthService,
		AuthGuard,
		DashboardService,
		ReminderService,
		ReferenceDataConverter,
	],
	exports: [
		DashboardComponent,
		MyLeadsComponent,
		MyUserComponent,
		MyReminderComponent,
		MyPolicyDatabaseComponent,
		LeadModule
	],
	entryComponents: [
	]
})
export class DashboardModule { }
