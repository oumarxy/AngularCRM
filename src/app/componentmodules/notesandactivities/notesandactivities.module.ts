import { NgModule } from '@angular/core';
import { NotesAndActivitiesComponent } from './notesactivities.component';
import { EditActivityComponent } from './editactivity.dialog.component';
import { EditNoteComponent } from './editnote.dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { NoteService, TodayLeadActivityService } from './notesactivities.service';
import { ViewNoteComponent } from './viewnote.dialog.component';

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
		NotesAndActivitiesComponent,
		EditActivityComponent,
		EditNoteComponent,
		ViewNoteComponent
	],
	bootstrap: [ NotesAndActivitiesComponent ],
	providers: [ NoteService, TodayLeadActivityService ],
	exports: [
		NotesAndActivitiesComponent,
		EditActivityComponent,
		EditNoteComponent,
		ViewNoteComponent
	],
	entryComponents: [
		EditActivityComponent,
		EditNoteComponent,
		ViewNoteComponent
	]
})
export class NotesAndActivitiesModule { }
