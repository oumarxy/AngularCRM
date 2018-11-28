import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { tap } from 'rxjs/operators';
import { EditComponent } from './dialogboxes/edit.dialog.component';
import { DeleteComponent } from './dialogboxes/delete.dialog.component';
import { RugbyDataSource } from './datasource';

@Component({
	selector: 'app-datatable',
	styleUrls: [
		'./datatable.component.css'
	],
	templateUrl: './datatable.component.html',
	// templateUrl: './main.leadtable.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
			state('expanded', style({height: '*', visibility: 'visible'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class DataTableComponent implements OnInit, AfterViewInit {
	@Input() add: Function;
	@Input() displaySettings; // set the display settings to those in the table settings file in appdata
	@Input() dataPath: string;
	dataSource: RugbyDataSource | null; // initialize a DataSource
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	// displays = MYLEADSDISPLAY;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public dialog: MatDialog, public http: HttpClient) {}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.displayedColumns.push('edit');
		this.displayedColumns.push('delete');
		this.dataSource = new RugbyDataSource(this.dataPath, this.paginator, this.sort, this.http);
		this.dataSource.loadData('', 10, 0, this.dataPath);
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadPage())
		).subscribe();
	}

	loadPage() {
		this.dataSource.loadData(this.sort.active, this.paginator.pageSize, this.paginator.pageIndex, this.dataPath);
	}

	edit(id: string) {
		const dialogRef = this.dialog.open(EditComponent, {
			data: {}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPage();
		});
	}

	delete(id: string) {
		const dialogRef = this.dialog.open(DeleteComponent, {
			data: {}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadPage();
		});
	}
}
