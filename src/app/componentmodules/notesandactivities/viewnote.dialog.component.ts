import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../../appdata/datamodels';
@Component({
	selector: 'app-viewnote',
	template: `<mat-dialog-content>
					<h5>{{ note.noteTitle }}</h5>
					<p>{{ note.creationTime | dateTime }}<p>
					<p>{{ note.data }}</p>
				</mat-dialog-content>
				<mat-dialog-actions>
					<button mat-button mat-dialog-close>Close</button>
				</mat-dialog-actions>`,
	styleUrls: [
		'./notesactivities.component.css'
	]
  })
  export class ViewNoteComponent {
	note: Note;
	constructor(
	  	public dialogRef: MatDialogRef<ViewNoteComponent>,	// same shit as above
		@Inject(MAT_DIALOG_DATA) public data: any) {
			this.note = data.note;
		}

	onNoClick(): void {
	  this.dialogRef.close();
	}

}
