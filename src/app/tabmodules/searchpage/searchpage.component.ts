import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'hammerjs';
import { Observable} from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-searchpage',
	styleUrls: [
		'./searchpage.component.css'
	],
	templateUrl: './searchpage.component.html'
})
export class SearchPageComponent implements OnInit, AfterViewInit {
	@ViewChild('lastNameFilter') lastNameFilter: ElementRef;
	@ViewChild('firstNameFilter') firstNameFilter: ElementRef;
	@ViewChild('emailFilter') emailFilter: ElementRef;
	constructor() {}

	ngOnInit() {}

	ngAfterViewInit() {
	}
}
