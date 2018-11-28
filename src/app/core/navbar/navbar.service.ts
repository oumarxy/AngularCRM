import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginService } from '../../login/login.service';

@Injectable()
export class NavbarService {
	visible: boolean;
	userIsAdmin: boolean;
	userIsDev: boolean;
	userRole: string;
	isPreviouslyLoggedIn: boolean;
	constructor(private http: HttpClient, private loginService: LoginService) {
		this.visible = true;
		this.userIsAdmin = false;
		this.userIsDev = false;
	}

	hide() { this.visible = false; }
	show() { this.visible = true; }
	toggle() { this.visible = !this.visible; }
	hideAdmin() { this.userIsAdmin = false; }
	showAdmin() { this.userIsAdmin = true; }
	toggleAdmin() { this.userIsAdmin = !this.userIsAdmin; }
	hideDev() { this.userIsDev = false; }
	showDev() { this.userIsDev = true; }
	toggleDev() { this.userIsDev = !this.userIsDev; }

	isAdmin() {
		return this.userIsAdmin;
	}

	isDev() {
		return this.userIsDev;
	}

	display() {
		if (localStorage.getItem('user') !== null) {
			const roleId = JSON.parse(localStorage.getItem('user')).roleId;
			if (
				roleId === '10' ||
				roleId === '0' ||
				roleId === '4'
			) {
				this.showDev();
				this.showAdmin();
			} else if (
				roleId === '1' ||
				roleId === '2'
			) {
				this.showAdmin();
			}
			this.show();
		}
	}

	previouslyLoggedIn() {
		return this.isPreviouslyLoggedIn;
	}

	setAsLoggedIn() {
		this.isPreviouslyLoggedIn = true;
	}

	setAsLoggedOut() {
		this.isPreviouslyLoggedIn = false;
	}

	logoutUser() {
		this.setAsLoggedOut();
		this.loginService.logout();
	}
}
