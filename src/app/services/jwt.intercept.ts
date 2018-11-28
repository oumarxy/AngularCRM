import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	token: string;
	constructor(private router: Router) { }

	private handleAuthError(err: HttpErrorResponse): Observable<any> {
		return Observable.throw(err);
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// check if request is going to a microsoft server.  If so, use the microsoft token for email
		if (
			request.url.search('https://graph.microsoft.com/') !== -1
		) {
			this.token = localStorage.getItem('token');
		} else {	// attach the API token
			this.token = localStorage.getItem('ctoken');
		}
		// add authorization header with jwt token if available

		request = request.clone({
			setHeaders: {
				Authorization: `${this.token}`
				// 'Content-Type': 'application/json'
				/* Origin: `http://localhost:4200`,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials' : 'true'*/
			}
		});
		return next.handle(request).catch(err => this.handleAuthError(err));
	}
}
