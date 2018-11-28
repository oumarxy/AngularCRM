import { Component} from '@angular/core';
import { NOTESDISPLAY } from '../../../appdata/tablesettings';
@Component({
	selector: 'app-notesrepo',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}"></app-datatable>`,
})
export class NotesRepoComponent  {
	displaySettings = NOTESDISPLAY;
	dataPath = 'notes';
	constructor() {}
}

