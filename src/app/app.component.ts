import { Component, HostListener } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	// clear all storage on window close
	// note tokens need to be explicitly deleted with local storage
	// consider moving all tokens to session storage
	@HostListener('window:onbeforeunload', ['$event'])
	clearLocalStorage(event) {
			localStorage.clear();
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			localStorage.removeItem('ctoken');
	}

}
