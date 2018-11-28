import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Referral } from '../../../../appdata/datamodels';
import { PATH } from '../../../../services/services.config';
@Injectable()
export class ReferralService {

	constructor(private http: HttpClient) {}

	public getReferrals(sort: string, size: number, page: number): Observable<Referral[]> {
		return this.http.get<Referral[]>(PATH + '/referrals', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addReferral(referral: Referral) {
		this.http.post(PATH + '/referrals', referral).subscribe(res => {
		}, err => {
		});
	}
}

