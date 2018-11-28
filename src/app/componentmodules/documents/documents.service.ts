import { FileStoreDocument, FileDoc } from '../../appdata/datamodels';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { PATH } from '../../services/services.config';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { finalize } from 'rxjs/operators';
@Injectable()
export class DocumentService {

	constructor(private http: HttpClient) {}

	public getDocuments(sort: string, size: number, page: number): Observable<FileStoreDocument[]> {
		return this.http.get<FileStoreDocument[]>(PATH + '/storedfiles', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
		}).map(res => res);
	}

	public getDocumentsByInsuranceLeadId(insuranceLeadId: string): Observable<FileStoreDocument[]> {
		return this.http.get<FileStoreDocument[]>(PATH + '/storedfiles/search/findByInsuranceLeadId', {
			params: new HttpParams()
			.set('insuranceLeadId', insuranceLeadId)
		}).map(res => res);
	}

	public getDocumentsByCustomerId(sort: string, size: number, page: number, customerId: string): Observable<FileStoreDocument[]> {
		return this.http.get<FileStoreDocument[]>(PATH + '/storedfiles/search/findByCustomerId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('customerId', customerId)
		}).map(res => res);
	}

	public getDocumentsByPolicyId(sort: string, size: number, page: number, policyId: string): Observable<FileStoreDocument[]> {
		return this.http.get<FileStoreDocument[]>(PATH + '/storedfiles/search/findByPolicyId', {
			params: new HttpParams()
			.set('sort', sort)
			.set('size', size.toString())
			.set('page', page.toString())
			.set('policyId', policyId)
		}).map(res => res);
	}

	public getDocumentsByPolicyIdNoTable(policyId: string): Observable<FileStoreDocument[]> {
		return this.http.get<FileStoreDocument[]>(PATH + '/storedfiles/search/findByPolicyId', {
			params: new HttpParams()
			.set('policyId', policyId)
		}).map(res => res);
	}

	public addDocument(document: FileStoreDocument): Observable<FileStoreDocument> {
		return this.http.post<FileStoreDocument>(PATH + '/storedfiles', document)
		.map(res => res);
	}

	public deleteDocument(document: FileStoreDocument): Observable<FileStoreDocument> {
		return this.http.delete<FileStoreDocument>(PATH + '/storedfiles/' + document.id)
		.map(res => res);
	}

	public updateDocument(document: FileStoreDocument): Observable<FileStoreDocument> {
		return this.http.put<FileStoreDocument>(PATH + '/storedfiles/' + document.id, document)
		.map(res => res);
	}

	public getFile(fileId: string): Observable<FileDoc> {
		return this.http.get<FileDoc>(PATH + '/filestore/' + fileId).map(res => {
			return res;
		});
	}
}

export class DocumentDataSource implements DataSource<FileStoreDocument> {
	// Observables for customer data, loading, and filters
	private fileStoreSubject = new BehaviorSubject<FileStoreDocument[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	// set loading variable
	public loading$ = this.loadingSubject.asObservable();
	data: FileStoreDocument[] = [];

	constructor(private documentRepoService: DocumentService,
				private _paginator: MatPaginator,
				private _sort: MatSort) {}

	connect(collectionViewer: CollectionViewer): Observable<FileStoreDocument[]> {
		return this.fileStoreSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.fileStoreSubject.complete();
		this.loadingSubject.complete();
	}

	loadDocumentsById(id: string) {
		this.loadingSubject.next(true);
		this.documentRepoService.getDocumentsByInsuranceLeadId(id).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))).subscribe(documents => {
			this._paginator.length = documents['_embedded']['storedfiles'].length;
			this.data = [];
			this.data = documents['_embedded']['storedfiles'];
			this.fileStoreSubject.next(this.data);
		});
	}

	loadDocumentsByPolicyId(sort: string, size: number, page: number, id: string) {
		this.loadingSubject.next(true);
		this.documentRepoService.getDocumentsByPolicyId(sort, size, page, id).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))).subscribe(documents => {
			this._paginator.length = documents['_embedded']['storedfiles'].length;
			this.data = [];
			this.data = documents['_embedded']['storedfiles'];
			this.fileStoreSubject.next(this.data);
		});
	}

	loadDocuments(sort: string, size: number, page: number) {
		this.loadingSubject.next(true);

		this.documentRepoService.getDocuments(sort, size, page).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(documents => {
			this._paginator.length = documents['page']['totalElements'];
			this.fileStoreSubject.next(documents['_embedded']['storedfiles']);
		});
	}

	getDocuments() {
		return this.data;
	}
}

