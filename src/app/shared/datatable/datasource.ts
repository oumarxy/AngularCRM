import { HttpClient } from '@angular/common/http';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs/';
import { catchError, finalize } from 'rxjs/operators';
import { DataService } from './datatable.service';
import { of } from 'rxjs/observable/of';

export class RugbyDataSource implements DataSource<any[]> {
	// Observables for customer data, loading, and filters
	private dataSubject = new BehaviorSubject<any[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	// set loading variable
	public loading$ = this.loadingSubject.asObservable();
	// the data to be rendered, filtered
	renderedData: any[] = [];
	// tableRows for the expanded detail row
	private dataService: DataService;
	constructor(private _datapath: string,
				private _paginator: MatPaginator,
				private _sort: MatSort,
				private _http: HttpClient) {
					this.dataService = new DataService(_http);
				}

	connect(collectionViewer: CollectionViewer): Observable<any[]> {
		return this.dataSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.dataSubject.complete();
		this.loadingSubject.complete();
	}

	loadData(sort: string, size: number, page: number, path: string) {
		this.loadingSubject.next(true);
		this.dataService.getData(sort, size, page, path).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		).subscribe(data => {
			this._paginator.length = data['page']['totalElements'];
			this.renderedData = data['_embedded'][path];
			this.dataSubject.next(this.renderedData);
		});

	}
}
