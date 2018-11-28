import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { finalize } from 'rxjs/operators';
import { EmailTemplate } from '../../../appdata/datamodels';
import { PATH } from '../../../services/services.config';

@Injectable()
export class EmailTemplateService {

	constructor(private http: HttpClient) {}

	public getEmailTemplates(sort: string, size: number, page: number): Observable<EmailTemplate[]> {
		return this.http.get<EmailTemplate[]>(PATH + '/emailtemplates', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res =>  res );
	}

	public addEmailTemplate(emailTemplate: EmailTemplate) {
		this.http.post(PATH + '/emailtemplates', emailTemplate).subscribe(res => {
		}, err => {
		});
	}

	public deleteEmailTemplate(emailTemplate: EmailTemplate) {
		this.http.delete(PATH + '/emailtemplates/' + emailTemplate.id).subscribe(res => {
		}, err => {
		});
	}

	public updateEmailTemplate(emailTemplate: EmailTemplate) {
		this.http.put<EmailTemplate>(PATH + '/emailtemplates/' + emailTemplate.id, emailTemplate).subscribe(res => {
		}, err => {
		});
	}
}

export class EmailTemplateDataSource implements DataSource<EmailTemplate> {
	// Observables for customer data, loading, and filters
	private emailTemplateSubject = new BehaviorSubject<EmailTemplate[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	_filterChange = new BehaviorSubject('');

	// filter functions
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }
	// set loading variable
	public loading$ = this.loadingSubject.asObservable();

	constructor(private emailTemplateService: EmailTemplateService,
				private _paginator: MatPaginator,
				private _sort: MatSort) {
		this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
	}

	connect(collectionViewer: CollectionViewer): Observable<EmailTemplate[]> {
		return this.emailTemplateSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.emailTemplateSubject.complete();
		this.loadingSubject.complete();
	}

	loadEmailTemplates(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);

		this.emailTemplateService.getEmailTemplates(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(emailTemplates => {
			this._paginator.length = emailTemplates['page']['totalElements'];
			this.emailTemplateSubject.next(emailTemplates['_embedded']['emailtemplates']);
		});

	}
}

