import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SidingType } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class SidingTypeService {

	constructor(private http: HttpClient) {}

	public getSidingTypes(sort: string, size: number, page: number): Observable<SidingType[]> {
		return this.http.get<SidingType[]>(PATH + '/sidingtypes', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addSidingType(sidingType: SidingType) {
		this.http.post(PATH + '/sidingtypes', sidingType).subscribe(res => {
		}, err => {
		});
	}
}

