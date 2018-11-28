import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note, User } from '../../appdata/datamodels';
import { NoteService } from './notesactivities.service';

@Component({ // Edit User component
	selector: 'app-editnote',
	template: `<h2 mat-dialog-title>Edit Note</h2>
	<mat-dialog-content>
		<div class="example-container">
			<form #editNoteForm="ngForm">
				<mat-form-field hintLabel="Note Subject" class="notefield">
					<textarea matInput
						placeholder="{{ note.noteTitle}}"
						matTextareaAutosize matAutosizeMinRows="1"
						id="noteTitle"
						[(ngModel)]="note.noteTitle"
						name="noteTitle">
					</textarea>
				</mat-form-field>
				<mat-form-field hintLabel="Note Content" class="notefield">
					<textarea matInput matTextareaAutosize matAutosizeMinRows="5" id="data" [(ngModel)]="note.data" name="data"></textarea>
				</mat-form-field>
			</form>
		</div>
	</mat-dialog-content>
	<mat-dialog-actions>
		<button mat-button mat-dialog-close>Cancel</button>
		<button mat-button [mat-dialog-close]="true" (click)="submitEdits()">Save Changes</button>
	</mat-dialog-actions>

	`,
	styleUrls: [
		'./notesactivities.component.css'
	]
  })
  export class EditNoteComponent {
	note: Note;
	users: User[];
	constructor(
	  	public dialogRef: MatDialogRef<EditNoteComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any,
		private noteService: NoteService) {
			this.note = data.note;
		}

	onNoClick(): void {
	  this.dialogRef.close();
	}

	submitEdits() {
		this.noteService.editNote(this.note).subscribe(res => res);
	}
}
