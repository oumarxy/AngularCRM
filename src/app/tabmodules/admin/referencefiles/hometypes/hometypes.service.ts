import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HomeType } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
import { Injectable } from '@angular/core';
@Injectable()
export class HomeTypeService {

	constructor(private http: HttpClient) {}

	public getHomeTypes(sort: string, size: number, page: number): Observable<HomeType[]> {
		return this.http.get<HomeType[]>(PATH + '/hometypes', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res );
	}

	public addHomeType(homeType: HomeType) {
		this.http.post(PATH + '/hometypes', homeType).subscribe(res => {
		}, err => {
		});
	}
}
