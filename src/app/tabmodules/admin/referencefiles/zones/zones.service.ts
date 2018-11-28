import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Zone } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class ZoneService {

	constructor(private http: HttpClient) {}

	public getZones(sort: string, size: number, page: number): Observable<Zone[]> {
		return this.http.get<Zone[]>(PATH + '/zones', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addZone(zone: Zone) {
		this.http.post(PATH + '/zones', zone).subscribe(res => {
		}, err => {
		});
	}
}
