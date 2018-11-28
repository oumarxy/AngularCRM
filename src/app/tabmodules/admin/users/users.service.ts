import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { finalize } from 'rxjs/operators';
import { User, Role } from '../../../appdata/datamodels';
import { PATH, QUERYSIZE } from '../../../services/services.config';
import { ReferenceDataConverter } from '../../../services/referencedataconverter.service';
@Injectable()
export class UserService {

	constructor(private http: HttpClient) {}

	public getUsers(sort: string, size: number, page: number): Observable<User[]> {
		return this.http.get<User[]>(PATH + '/users', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public addUser(user: User) {
		this.http.post(PATH + '/users/sign-up', user).subscribe(res => {
		}, err => {
		});
	}

	public deleteUser(user: User) {
		this.http.delete(PATH + '/users/' + user.id).subscribe(res => {
		}, err => {
		});
	}

	public updateUser(user: User) {
		return this.http.put<User>(PATH + '/users/' + user.id, user).subscribe(res => {
		}, err => {
		});
	}

	public findByUserName(query: string) {// : Observable<HttpResponse> {
		return this.http.get<User>(PATH + '/users/search/findByUserName?userName=' + query);
	}

	public getUserById(id: string) {
		return this.http.get<User>(PATH + '/users/search/findById', {
			params: new HttpParams()
			.set('id', id)
		}).map(res => res);
	}

	// Get user roles
	public getObservRoles(): Observable<Role[]> {
		return this.http.get<Role[]>(PATH + '/roles?size=' + QUERYSIZE).map( res => {
			return res['_embedded']['roles'];
		});
	}
}

@Injectable()
export class UserCount {
	constructor(private http: HttpClient) {
	}

	getUsers() {
		 return this.http.get(PATH + '/users').map(res =>
			res['page']['totalElements']
		);
	}
}

export class UserDataSource implements DataSource<User> {
	// Observables for customer data, loading, and filters
	private userSubject = new BehaviorSubject<User[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	// set loading variable
	public loading$ = this.loadingSubject.asObservable();

	// the data to be rendered, filtered
	filteredData: User[] = [];
	renderedData: User[] = [];
	// tableRows for the expanded detail row
	constructor(private userService: UserService,
				private _paginator: MatPaginator,
				private referenceDataConverter: ReferenceDataConverter) {}

	connect(collectionViewer: CollectionViewer): Observable<User[]> {
		return this.userSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.userSubject.complete();
		this.loadingSubject.complete();
	}

	loadUsers(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);

		this.userService.getUsers(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(users => {
			this._paginator.length = users['page']['totalElements'];
			this.renderedData = users['_embedded']['users'];
			this.renderedData.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.userSubject.next(this.renderedData);
		});

	}

}

