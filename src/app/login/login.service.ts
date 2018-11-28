import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PATH } from '../services/services.config';
import { RequestCache } from '../services/request-cache.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
	public token: string;

	constructor(
		private http: HttpClient,
		private cache: RequestCache,
	) { }

	login(username: string, password: string): Observable<any> {
		return this.http.post(PATH + '/login', { userName: username, password: password }, {observe: 'response'}).pipe(map(
			res => {
				return res;
			}
		));
	}

	logout() {
		// remove user from local storage to log user out
		this.token = null;
		localStorage.clear();
		this.cache.clear();
	}

	register(username: string, email: string, role: string, password: string): Observable<any> {
	  // tslint:disable-next-line:max-line-length
	  return this.http.post(PATH + '/users/sign-up', { userName: username, email: email, role: role, password: password }, {observe: 'response'});
	}
}
