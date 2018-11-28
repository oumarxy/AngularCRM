import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LeadSource } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class LeadSourceService {

	constructor(private http: HttpClient) {}

	public getLeadSources(sort: string, size: number, page: number): Observable<LeadSource[]> {
		return this.http.get<LeadSource[]>(PATH + '/leadsources', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res );
	}

	public addLeadSource(leadSource: LeadSource) {
		this.http.post(PATH + '/leadsources', leadSource).subscribe(res => {
		}, err => {
		});
	}
}
