import { Component} from '@angular/core';
import { EMAILDISPLAY } from '../../../appdata/tablesettings';
@Component({
	selector: 'app-emailrepo',
	template: `<app-datatable [displaySettings]="displaySettings" dataPath="{{ dataPath }}"></app-datatable>`,
})
export class EmailRepoComponent  {
	displaySettings = EMAILDISPLAY;
	dataPath = 'customeremailaddresses';
	constructor() {}
}
