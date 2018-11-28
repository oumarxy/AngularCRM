import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Role } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class RoleService {

	constructor(private http: HttpClient) {}

	public getRoles(sort: string, size: number, page: number): Observable<Role[]> {
		return this.http.get<Role[]>(PATH + '/roles', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addRole(role: Role) {
		this.http.post(PATH + '/roles', role).subscribe(res => {
		}, err => {
		});
	}
}
