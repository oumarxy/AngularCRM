import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TodayActivity } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class TodayActivityService {

	constructor(private http: HttpClient) {}

	public getTodayActivities(sort: string, size: number, page: number): Observable<TodayActivity[]> {
		return this.http.get<TodayActivity[]>(PATH + '/todayactivities', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addTodayActivity(todayActivityGroup: TodayActivity) {
		this.http.post(PATH + '/todayactivities', todayActivityGroup).subscribe(res => {
		}, err => {
		});
	}
}
