import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeadService } from '../lead.service';
import { DeadLeadReason, Note } from '../../../appdata/datamodels';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';
import { NoteService } from '../../notesandactivities/notesactivities.service';

@Component({ // Delete component
	selector: 'app-deletelead',
	templateUrl: './delete.dialog.component.html',
	styleUrls: [ './dialog.component.css' ]
})
export class LeadDeleteComponent {
	refdata = 'Lead';
	// selection array of all the id's to be deleted (for group delete)
	selection = [];
	// deletion reason
	deadLeadReasons: DeadLeadReason[];
	deadLeadReasonId: string;
	note: Note;
	constructor(
		public dialogRef: MatDialogRef<LeadDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private leadService: LeadService,
		private noteService: NoteService,
		private referenceDataConverter: ReferenceDataConverter) {
			this.note = new Note();
			this.deadLeadReasonId = '';
			this.deadLeadReasons = this.referenceDataConverter.getDeadLeadReasons();
		}

	deleteLeads() {
		// for each selection in array, delete it
		this.note.userId = localStorage.getItem('#userid');
		this.note.leadId = this.data.lead.id;
		this.data.lead.deadLeadReasonId = this.deadLeadReasonId;
		this.leadService.deleteLead(this.data.lead).subscribe(res => res);
		// create notes associated with deleted lead(s)
		this.note.data = this.deadLeadReasonId + ' : ' + this.note.data;
		this.noteService.addNote(this.note);

	}
	onNoClick(): void {
		this.dialogRef.close();
	}
}
