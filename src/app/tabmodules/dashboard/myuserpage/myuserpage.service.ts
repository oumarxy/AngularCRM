import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../appdata/datamodels';
import { PATH } from '../../../services/services.config';


@Injectable()
export class MyUserService {

	constructor(private http: HttpClient) {
	}

	public findByUserName(query: string): Observable<User> {
		return this.http.get<User>(PATH + '/users/search/findByUserName?userName=' + query).map(
			res => {
				return res;
			}
		);
	}
}
