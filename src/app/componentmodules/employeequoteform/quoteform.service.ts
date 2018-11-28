import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reminder } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuoteFormService {
	constructor(private http: HttpClient, private referenceDataConverter: ReferenceDataConverter) {}

	public getRemindersByUserId(userId: string, page: number): Observable<Reminder> {
		return this.http.get<Reminder>(PATH + '/reminders/search/findByUserId/', {
			params: new HttpParams()
			.set('sort', 'reminderDate,desc')
			.set('page', page.toString())
			.set('userId', userId)
		}).map(res => res);
	}
	public addReminder(reminder: Reminder) {
		this.referenceDataConverter.convertReferenceValuesToId(reminder);
		this.http.post(PATH + '/reminders', reminder).subscribe(res => {
		}, err => {
		});
	}

	public deleteReminder(reminder: Reminder) {
		this.http.delete(PATH + '/reminders/' + reminder.id).subscribe(res => {
		}, err => {
		});
	}

}
