import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';
import { PATH, CLEAR } from '../../services/services.config';

@Injectable()
export class DataService {

	constructor(private http: HttpClient) {}

	// use this as the proper model for making rest calls.  Params need to be mapped as such
	// getLeads(sort: string, size: number, page: number): Observable<InsuranceLead[]> {
	getData(sort: string, size: number, page: number, path: string): Observable<any[]> {
		return this.http.get<any[]>(PATH + '/' + path, {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).pipe(map(res => {
			return res;
		}
		));
	}

	public refresh() {
		this.http.get(CLEAR).subscribe(res => {
		}, err => {
		});
	}

	// for the add lead function, all queue functionality that checks for existing leads
	// customers, emails, etc. will have to be added to this service call as well
	public addData(data: any, path: string) {
		this.http.post(PATH + '/' + path + '/', data).subscribe(res => {
		}, err => {
		});
	}

	public deleteData(data: any) {
		this.http.delete(PATH + '/insuranceleads/' + data.id).subscribe(res => {
		}, err => {
		});
	}

	public updateData(data: any) {
		return this.http.put(PATH + '/insuranceleads/' + data.id, data).subscribe(res => {
		}, err => {
		});
	}
}
