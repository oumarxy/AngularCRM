import { Chart } from 'chart.js';
import { StatReportsService } from './statreports.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeadSource, UnfilteredInsuranceLead } from '../../appdata/datamodels';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { PATH, QUERYSIZE } from '../../services/services.config';

@Component({
	selector: 'app-statreports',
	styleUrls: [
		'./statreports.component.css'
	],
	templateUrl: './statreports.component.html'
})
export class StatReportsComponent implements OnInit, AfterViewInit {
	chart = []; // This will hold our chart info
	piechart = [];	//
	hotchart = [];

	timedata;	// array to hold all displayed data timestamps for x axis
	displaydata: number[];
	leadSources: LeadSource[];
	leadSourceData: Map<string, number>;
	sources: string[];
	leadSourceCount: number[];
	leadCount = 0;
	firstEntry: boolean;
	date: Date;
	lastDate: Date;
	selected = 100;
	loadingFinished: Promise<boolean>;
	// @ViewChild('datepicker', {read: ElementRef}) datePicker: ElementRef;
	constructor(private statsService: StatReportsService, private referenceDataConverter: ReferenceDataConverter, private http: HttpClient) {
		// this.leadSources = this.referenceDataConverter.getLeadSources();
	}
	ngOnInit() {
	}

	ngAfterViewInit() {
		// this.buildChart();
	}

	searchData(selectedNumber: number) {
		this.selected = selectedNumber;
	}
}
