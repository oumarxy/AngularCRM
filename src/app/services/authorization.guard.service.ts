import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './authorization.service';
@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private authservice: AuthService) { }

	canActivate() {
		// Run token validation code here.  Send http request to validation path for access permission
		if (!this.authservice.isAuthenticated()) {
			this.router.navigate(['login']);
			return false;
		}
		return true;
	}
}
