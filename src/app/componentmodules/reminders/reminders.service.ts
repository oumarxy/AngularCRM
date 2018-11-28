import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reminder } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/';
import { MatPaginator } from '@angular/material';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ReminderService {
	constructor(private http: HttpClient, private referenceDataConverter: ReferenceDataConverter) {}

	public getRemindersByLeadId(size: number, page: number, leadId: string): Observable<Reminder> {
		// return this.http.get<Reminder>(PATH + '/reminders/search/findByLeadIdAndReminderSent/', {
		return this.http.get<Reminder>(PATH + '/reminders/search/findByLeadId/', {
			params: new HttpParams()
			.set('sort', 'reminderDate,desc')
			.set('size', size.toString())
			.set('page', page.toString())
			.set('leadId', leadId)
			// .set('reminderSent', 'true')
		}).map(res => res);
	}

	public getRemindersByUserId(size: number, page: number, userId: string): Observable<Reminder> {
		// return this.http.get<Reminder>(PATH + '/reminders/search/findByUserIdAndReminderSent/', {
		return this.http.get<Reminder>(PATH + '/reminders/search/findByUserId/', {
			params: new HttpParams()
			.set('sort', 'reminderDate,desc')
			.set('size', size.toString())
			.set('page', page.toString())
			.set('userId', userId)
			// .set('reminderSent', 'true')
		}).map(res => res);
	}

	public getRemindersByUserIdAndDeleted(size: number, page: number, userId: string, deleted: boolean): Observable<Reminder> {
		// return this.http.get<Reminder>(PATH + '/reminders/search/findByUserIdAndReminderSent/', {
		return this.http.get<Reminder>(PATH + '/reminders/search/findByUserIdAndDeleted/', {
			params: new HttpParams()
			.set('sort', 'reminderDate,desc')
			.set('size', size.toString())
			.set('page', page.toString())
			.set('userId', userId)
			.set('deleted', deleted.toString())
		}).map(res => res);
	}

	public getRemindersByUserIdAndSent(sort: string, size: number, page: number, userId: string, sent: boolean): Observable<Reminder> {
		// return this.http.get<Reminder>(PATH + '/reminders/search/findByUserIdAndReminderSent/', {
		return this.http.get<Reminder>(PATH + '/reminders/search/findByUserIdAndReminderSent/', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('userId', userId)
			.set('reminderSent', sent.toString())
		}).map(res => res);
	}

	public addReminder(reminder: Reminder): Observable<Reminder> {
		this.referenceDataConverter.convertReferenceValuesToId(reminder);
		return this.http.post<Reminder>(PATH + '/reminders', reminder).map(res => res);
	}

	public editReminder(reminder: Reminder): Observable<Reminder> {
		this.referenceDataConverter.convertReferenceValuesToId(reminder);
		return this.http.put<Reminder>(PATH + '/reminders/' + reminder.id, reminder)
		.map(res => res)
		.catch(err => Observable.of(err));
	}

	public deleteReminder(reminder: Reminder): Observable<Reminder> {
		return this.http.delete<Reminder>(PATH + '/reminders/' + reminder.id).map(res => res);
	}

	private handleError(error: any) {
		const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		return Observable.throw(error);
	}

}

export class ReminderDataSource implements DataSource<Reminder> {
	// Observables for customer data, loading, and filters
	private reminderSubject = new BehaviorSubject<Reminder[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	// set loading variable
	public loading$ = this.loadingSubject.asObservable();

	constructor(private reminderService: ReminderService,
				private _paginator: MatPaginator) {}

	connect(collectionViewer: CollectionViewer): Observable<Reminder[]> {
		return this.reminderSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.reminderSubject.complete();
		this.loadingSubject.complete();
	}

	loadRemindersByLeadId(size: number, page: number, leadId: string) {
		this.loadingSubject.next(true);
		this.reminderService.getRemindersByLeadId(size, page, leadId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(reminders => {
			this._paginator.length = reminders['page']['totalElements'];
			this.reminderSubject.next(reminders['_embedded']['reminders']);
		});
	}

	loadRemindersByUserId(size: number, page: number, userId: string) {
		this.loadingSubject.next(true);
		this.reminderService.getRemindersByUserId(size, page, userId).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(reminders => {
			this._paginator.length = reminders['page']['totalElements'];
			this.reminderSubject.next(reminders['_embedded']['reminders']);
		});
	}

	loadRemindersByUserIdAndDeleted(size: number, page: number, userId: string, deleted: boolean) {
		this.loadingSubject.next(true);
		this.reminderService.getRemindersByUserIdAndDeleted(size, page, userId, deleted).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(reminders => {
			this._paginator.length = reminders['page']['totalElements'];
			this.reminderSubject.next(reminders['_embedded']['reminders']);
		});
	}

	loadRemindersByUserIdAndSent(sort: string, size: number, page: number, userId: string, sent: boolean) {
		this.loadingSubject.next(true);
		this.reminderService.getRemindersByUserIdAndSent(sort, size, page, userId, sent).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(reminders => {
			this._paginator.length = reminders['page']['totalElements'];
			this.reminderSubject.next(reminders['_embedded']['reminders']);
		});
	}
}
