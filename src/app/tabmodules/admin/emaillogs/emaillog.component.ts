import { Component} from '@angular/core';
import { EMAILLOGDISPLAY } from '../../../appdata/tablesettings';
@Component({
	selector: 'app-emaillogrepo',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}"></app-datatable>`,
})
export class EmailLogRepoComponent  {
	displaySettings = EMAILLOGDISPLAY;
	dataPath = 'emaillogs';
	constructor() {}
}

