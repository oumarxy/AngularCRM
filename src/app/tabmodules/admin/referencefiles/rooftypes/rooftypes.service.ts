import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RoofType } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class RoofTypeService {

	constructor(private http: HttpClient) {}

	public getRoofTypes(sort: string, size: number, page: number): Observable<RoofType[]> {
		return this.http.get<RoofType[]>(PATH + '/rooftypes', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res =>  res );
	}

	public addRoofType(roofType: RoofType) {
		this.http.post(PATH + '/rooftypes', roofType).subscribe(res => {
		}, err => {
		});
	}
}


