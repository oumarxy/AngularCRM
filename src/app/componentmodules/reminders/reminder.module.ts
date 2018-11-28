import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { ReminderComponent } from './reminders.component';
import { AddReminderComponent } from './addreminder.dialog.component';
import { EditReminderComponent } from './editreminder.component';
import { DeleteReminderComponent } from './deletereminder.component';
import { ReminderService } from './reminders.service';
import { ViewReminderComponent } from './viewreminder.dialog.component';

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
		ReminderComponent,
		AddReminderComponent,
		EditReminderComponent,
		DeleteReminderComponent,
		ViewReminderComponent
	],
	bootstrap: [ ReminderComponent ],
	providers: [ ReminderService ],
	exports: [
		ReminderComponent,
		AddReminderComponent,
		EditReminderComponent,
		DeleteReminderComponent,
		ViewReminderComponent
	],
	entryComponents: [
		AddReminderComponent,
		EditReminderComponent,
		DeleteReminderComponent,
		ViewReminderComponent
	]
})
export class ReminderModule { }
