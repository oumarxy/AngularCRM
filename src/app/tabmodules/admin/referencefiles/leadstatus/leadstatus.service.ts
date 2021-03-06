import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LeadStatus } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class LeadStatusService {

	constructor(private http: HttpClient) {}

	public getLeadStatus(sort: string, size: number, page: number): Observable<LeadStatus[]> {
		return this.http.get<LeadStatus[]>(PATH + '/leadstatuses', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res );
	}

	public addLeadStatus(leadStatus: LeadStatus) {
		this.http.post(PATH + '/leadstatuses', leadStatus).subscribe(res => {
		}, err => {
		});
	}
}

