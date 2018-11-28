import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NavbarService } from '../core/navbar/navbar.service';
import { ReferenceDataConverter } from '../services/referencedataconverter.service';

@Component({
	templateUrl: 'login.component.html',
	styleUrls: [ './login.component.css']
})

export class LoginComponent implements OnInit {
	model: any = {};
	error = '';
	token: string;


	constructor(
		private router: Router,
		private loginService: LoginService,
		public nav: NavbarService,
		private referenceDataConverter: ReferenceDataConverter
	) { }

	ngOnInit() {
		// reset login status
		this.nav.hide();
		this.loginService.logout();
	}

	login() {
		this.loginService.login(this.model.username, this.model.password).subscribe (
			data => {
				this.token = data.headers.get('Authorization');
				localStorage.setItem('#token', this.token);
				localStorage.setItem('user', JSON.stringify(data['body']));
				if (data.userAccountEnabled === false) {
					this.error = 'This account has been disabled.  Please contact an administrator';
					this.loginService.logout();
					return;
				}
				// this.referenceDataConverter.serviceLoad();
				this.router.navigate(['/dashboard']);
				this.nav.display();
			},
			err => {
				if (err.status === 401) {
					this.error = 'Username or Password is Incorrect';
				} else {
					this.error = 'Unexpected Error Occured';
				}
			}
		);
	}

	register() {
		this.loginService.register(this.model.username, 'begley@factoryexpohomes.com', 'dev', this.model.password).subscribe(
			data => {
			}
		);
	}
}
