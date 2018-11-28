import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort} from '@angular/material';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { PATH } from '../../services/services.config';
import { TodayLeadActivity, Note } from '../../appdata/datamodels';
@Injectable()
export class TodayLeadActivityService {
	constructor(private http: HttpClient, private referenceDataConverter: ReferenceDataConverter) {}
	public getLeadActivity(sort: string, size: number, page: number): Observable<TodayLeadActivity[]> {
		return this.http.get<TodayLeadActivity[]>(PATH + '/todayactivities', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public getLeadActivityByLeadId(sort: string, size: number, page: number, leadId: string): Observable<TodayLeadActivity[]> {
		return this.http.get<TodayLeadActivity[]>(PATH + '/todayleadactivities/search/findByLeadId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('leadId', leadId)
		}).map(res => res);
	}

	public getLeadActivityByUserId(sort: string, size: number, page: number, userId: string): Observable<TodayLeadActivity[]> {
		return this.http.get<TodayLeadActivity[]>(PATH + '/todayleadactivities/search/findByUserId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('userId', userId)
		}).map(res => res);
	}

	public addTodayLeadActivity(todayActivity: TodayLeadActivity): Observable<TodayLeadActivity> {
		return this.http.post<TodayLeadActivity>(PATH + '/todayleadactivities', todayActivity).map(res => res);
	}
	public editTodayLeadActivity(todayActivity: TodayLeadActivity): Observable<TodayLeadActivity> {
		this.referenceDataConverter.convertReferenceValuesToId(todayActivity);
		return this.http.put<TodayLeadActivity>(PATH + '/todayleadactivities/' + todayActivity.id, todayActivity).map(res => res);
	}
	public deleteTodayLeadActivity(todayActivity: TodayLeadActivity): Observable<TodayLeadActivity> {
		return this.http.delete<TodayLeadActivity>(PATH + '/todayleadactivities/' + todayActivity.id).map(res => {
			return res;
		} );
	}
}

export class TodayLeadActivityDataSource implements DataSource<TodayLeadActivity> {
	// Observables for customer data, loading, and filters
	private leadSubject = new BehaviorSubject<TodayLeadActivity[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	// set loading variable
	public loading$ = this.loadingSubject.asObservable();
	data: TodayLeadActivity[] = [];

	constructor(private activityService: TodayLeadActivityService,
				private _paginator: MatPaginator,
				private referenceDataConverter: ReferenceDataConverter) {
				}

	connect(collectionViewer: CollectionViewer): Observable<TodayLeadActivity[]> {
		return this.leadSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.leadSubject.complete();
		this.loadingSubject.complete();
	}

	loadTodayLeadActivityByLeadId(sort: string, size: number, page: number, id: string) {
		this.loadingSubject.next(true);

		this.activityService.getLeadActivityByLeadId(sort, size, page, id).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))).subscribe(todayActivity => {
			this._paginator.length = todayActivity['page']['totalElements'];
			this.data = [];
			this.data = todayActivity['_embedded']['todayleadactivities'];
			this.data.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.leadSubject.next(this.data);
		});
	}

	loadTodayLeadActivityByUserId(sort: string, size: number, page: number, id: string) {
		this.loadingSubject.next(true);

		this.activityService.getLeadActivityByUserId(sort, size, page, id).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))).subscribe(todayActivity => {
			this._paginator.length = todayActivity['page']['totalElements'];
			this.data = [];
			this.data = todayActivity['_embedded']['todayleadactivities'];
			this.data.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.leadSubject.next(this.data);
		});
	}
}



@Injectable()
export class NoteService {
	constructor(private http: HttpClient, private referenceDataConverter: ReferenceDataConverter) {}
	public getNotes(sort: string, size: number, page: number): Observable<Note[]> {
		return this.http.get<Note[]>(PATH + '/notes', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public getNotesByUserId(sort: string, size: number, page: number, userId: string): Observable<Note[]> {
		return this.http.get<Note[]>(PATH + '/notes/search/findByUserId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('userId', userId)
		}).map(res => res);
	}

	public getNotesByLeadId(sort: string, size: number, page: number, leadId: string): Observable<Note[]> {
		return this.http.get<Note[]>(PATH + '/notes/search/findByLeadId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('leadId', leadId)
		}).map(res => res);
	}

	public addNote(note: Note): Observable<Note[]> {
		this.referenceDataConverter.convertReferenceValuesToId(note);
		return this.http.post<Note[]>(PATH + '/notes/', note);
	}

	public editNote(note: Note): Observable<Note[]> {
		this.referenceDataConverter.convertReferenceValuesToId(note);
		return this.http.put<Note[]>(PATH + '/notes/' + note.id, note).map(res => res);
	}

	public deleteNote(note: Note): Observable<Note> { return this.http.delete<Note>(PATH + '/notes/' + note.id).map(res => res); }
}

export class NoteDataSource implements DataSource<Note> {
	// Observables for customer data, loading, and filters
	private noteSubject = new BehaviorSubject<Note[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	// set loading variable
	public loading$ = this.loadingSubject.asObservable();
	data: Note[] = [];
	constructor(private noteService: NoteService,
				private _paginator: MatPaginator,
				private _sort: MatSort,
				private referenceDataConverter: ReferenceDataConverter) {}

	connect(collectionViewer: CollectionViewer): Observable<Note[]> {
		return this.noteSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.noteSubject.complete();
		this.loadingSubject.complete();
	}

	loadNotes(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);
		this.noteService.getNotes(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))).subscribe(notes => {
			this._paginator.length = notes['page']['totalElements'];
			this.data = [];
			this.data = notes['_embedded']['notes'];
			this.data.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.noteSubject.next(this.data);
		});
	}

	loadNotesByLeadId(sort: string, size: number, page: number, leadId: string) {
		this.loadingSubject.next(true);
		this.noteService.getNotesByLeadId(sort, size, page, leadId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))).subscribe(notes => {
			this._paginator.length = notes['page']['totalElements'];
			this.data = [];
			this.data = notes['_embedded']['notes'];
			this.data.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.noteSubject.next(this.data);
		});

	}

	loadNotesByUserId(sort: string, size: number, page: number, userId: string) {
		this.loadingSubject.next(true);
		this.noteService.getNotesByUserId(sort, size, page, userId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))).subscribe(notes => {
			this._paginator.length = notes['page']['totalElements'];
			this.data = [];
			this.data = notes['_embedded']['notes'];
			this.data.forEach(element => {
				this.referenceDataConverter.convertReferenceIdsToValue(element);
			});
			this.noteSubject.next(this.data);
		});

	}
}


