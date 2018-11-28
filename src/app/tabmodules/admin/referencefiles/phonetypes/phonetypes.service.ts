import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PhoneType } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class PhoneTypeService {

	constructor(private http: HttpClient) {}

	public getPhoneTypes(sort: string, size: number, page: number): Observable<PhoneType[]> {
		return this.http.get<PhoneType[]>(PATH + '/phonetypes', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addPhoneType(phoneType: PhoneType) {
		this.http.post(PATH + '/phonetypes', phoneType).subscribe(res => {
		}, err => {
		});
	}
}

