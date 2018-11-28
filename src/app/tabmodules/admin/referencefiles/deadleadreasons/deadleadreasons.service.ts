import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DeadLeadReason } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
import { Observable } from 'rxjs/';
@Injectable()
export class DeadLeadReasonService {

	constructor(private http: HttpClient) {}

	public getDeadLeadReasons(sort: string, size: number, page: number): Observable<DeadLeadReason[]> {
		return this.http.get<DeadLeadReason[]>(PATH + '/deadleadreasons', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res );
	}

	public addDeadLeadReason(deadLeadReason: DeadLeadReason) {
		this.http.post(PATH + '/deadleadreasons', deadLeadReason).subscribe(res => {
		}, err => {
		});
	}

}


