import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
	constructor() {}
	public isAuthenticated(): boolean {
		const token = localStorage.getItem('ctoken');
		if (token !== null) {
			return true;
		}
		return false;
	}
}
