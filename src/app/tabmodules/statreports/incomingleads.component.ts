import { Chart } from 'chart.js';
import { StatReportsService } from './statreports.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeadSource, UnfilteredInsuranceLead } from '../../appdata/datamodels';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { PATH, QUERYSIZE } from '../../services/services.config';

@Component({
	selector: 'app-incomingleads',
	styleUrls: ['./statreports.component.css'],
	templateUrl: './incomingleads.component.html'
})
export class IncomingLeadsComponent implements OnInit, AfterViewInit {
	chart = []; // contains the line chart to show rate of incoming leads
	barchart = [];	// contains bar chart to show leads per lead source

	timedata: string[] = [];	// array to hold all displayed data timestamps for x axis
	displaydata: number[];	// holds data points for y axis
	leadSourceData: Map<string, number>; // holds data for map of source to number of leads
	leadSources: LeadSource[] = [];	// list of lead sources
	sources: string[] = [];	// array of list of sources found among leads
	leadSourceCount: number[] = [];	// array of count of leads per source in sources
	leadCount = 0;	// initializes the leadCount;
	date: Date;
	lastDate: Date;
	selected = 100;	// initial lead count to view
	constructor(private statsService: StatReportsService, private referenceDataConverter: ReferenceDataConverter, private http: HttpClient) {
		this.referenceDataConverter.loadData().subscribe(result => {
			this.leadSources = this.referenceDataConverter.getLeadSources();
			this.buildData(this.selected);
		});
	}
	ngOnInit() {}

	ngAfterViewInit() {}

	searchData(selectedNumber: number) {
		this.selected = selectedNumber;
		this.buildData(this.selected);
	}

	buildData(selected: number) {
		// clear old data
		this.timedata = [];
		this.displaydata = [];
		this.sources = [];
		this.leadSourceCount = [];
		this.leadSourceData = new Map<string, number>();
		this.leadCount = 0;

		// get all the leads for value selected
		this.statsService.getLeads(selected.toString()).subscribe(response => {
			const leadArray = response['_embedded']['insuranceleads'];
			leadArray.forEach((lead, idx, arr) => { 	// idx and arry used to make loop "self-aware"
				this.date = new Date(lead.creationTime); // get lead date
				if (this.leadCount === 0) {	// check if this is the first entry (necessary for date comparision)
					this.lastDate = this.date;
				}
				if (this.compareTime(this.date, this.lastDate)) {
					this.displaydata.unshift(this.leadCount); // save last date and lead count
					this.timedata.unshift(this.lastDate.toLocaleDateString());
					this.leadCount = 1; // reset lead count for new day
					this.lastDate = this.date; // create new date entry

				} else {	// is lead date same day as last date?
					this.leadCount++; // add to lead count for day
				}
				if (idx === arr.length - 1) { // if last entry in array, push data
					this.displaydata.unshift(this.leadCount);
					this.timedata.unshift(this.lastDate.toLocaleDateString());
				}
				this.getLeadSourceData(lead); // push lead source to bar chart for sources count
			});
			this.convertKeysToReferenceValues(this.leadSourceData);
			this.buildChart();
		});
	}

	buildChart() {
		this.chart = new Chart('canvas', {
			type: 'line',
			data: {
				labels: this.timedata,
				datasets: [
					{
						data: this.displaydata,
						borderColor: '#3cba9f',
						fill: false,
						label: 'Leads'
					}
				]
			},
			response: true,
			options: {
				title: {
					display: true,
					text: 'Creation distribution of last ' + this.selected + ' leads'
				},
				animation: false,
				legend: {
					display: true
				},
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Leads added (per day)'
						}
					}]
				}
			}
		});

		this.barchart = new Chart('barcanvas', {
			type: 'horizontalBar',
			data: {
				labels: this.sources,
				datasets: [
					{
						data: this.leadSourceCount,
						borderColor: '#3cba9f',
						backgroundColor: '#3cba9f',
						fill: true,
						label: 'Leads'
					}
				]
			},
			response: true,
			options: {
				title: {
					display: true,
					text: 'Source of last ' + this.selected + ' leads entering system'
				},
				animation: false,
				legend: {
					display: true
				},
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Number of Leads'
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Lead Source'
						}
					}]
				}
			}
		});
	}

	/**********SERVICE FUNCTIONS ************** */

	compareTime(time1: Date, time2: Date) {
		if (time1 < time2) { /* console.log(time1.toDateString + ' is before ' + time2.toDateString); */ }
		if (time1.getDay() === time2.getDay()) { /* console.log('Still the same day!'); */ }
		if ((time1 < time2) && (time1.getDay() !== time2.getDay())) { return true; }
	}

	getLeadSourceData(lead: UnfilteredInsuranceLead) {
		if (this.leadSourceData.has(lead.leadSourceId)) {
			this.leadSourceData.set(lead.leadSourceId.toString(), (this.leadSourceData.get(lead.leadSourceId) + 1));
		} else { this.leadSourceData.set(lead.leadSourceId.toString(), 1); }
	}

	convertKeysToReferenceValues(leadSourceArray: Map<string, number>) {
		leadSourceArray.forEach((k, v, m) => {	// k is the value, v is the key.  Don't ask why
			if (v === '') {
				const newkey = 'Unknown';
				leadSourceArray.set(newkey, k);
				leadSourceArray.delete(v);
				this.leadSourceCount.push(k);
				this.sources.push(newkey);
			}
			this.leadSources.forEach(source => {
				if (v === source.id) {
					const newkey = source.label + ' - ' + source.website;
					leadSourceArray.set(newkey, k);
					leadSourceArray.delete(v);
					this.leadSourceCount.push(k);
					this.sources.push(newkey);
				}
			});
		});
	}
}
