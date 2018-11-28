import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { User } from '../../appdata/datamodels';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: [ `.blue a {
					background-color:#e6e6e6;
				}
				nav {
					background-color: white;
				}
				.navbar-text {
					padding-right: 10px;
				}
				.dropdown-menu a {
					background-color: transparent;
				}` ]
})

export class NavbarComponent implements OnInit, AfterViewInit {
	currentUser: User;
	constructor( public nav: NavbarService) {
	}

	ngOnInit() {
		this.nav.hideAdmin();
		this.nav.hideDev();
		this.nav.display();
	}

	ngAfterViewInit() {
		this.nav.display();
	}

	isAdmin() {
		return this.nav.isAdmin();
	}

	isDev() {
		return this.nav.isDev();
	}

	logout() {
		this.nav.logoutUser();
	}
}
