import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TodayActivityGroup } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class TodayActivityGroupService {

	constructor(private http: HttpClient) {}

	public getTodayActivityGroups(sort: string, size: number, page: number): Observable<TodayActivityGroup[]> {
		return this.http.get<TodayActivityGroup[]>(PATH + '/todayactivitygroups', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addTodayActivityGroup(todayActivityGroup: TodayActivityGroup) {
		this.http.post(PATH + '/todayactivitygroups', todayActivityGroup).subscribe(res => {
		}, err => {
		});
	}
}

