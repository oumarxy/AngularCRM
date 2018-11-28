import { OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator, MatSort, MatDialog} from '@angular/material';
import { tap } from 'rxjs/operators';
import { StatReportsService, HotLeadDataSource } from './statreports.service';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { InsuranceLead, LeadSource, UnfilteredInsuranceLead } from '../../appdata/datamodels';
import { HOTLEADSDISPLAY } from '../../appdata/tablesettings';
import { PATH } from '../../services/services.config';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { LeadComponent } from '../../componentmodules/leads/lead.component';

@Component({
	selector: 'app-hotleadstable',
	styleUrls: ['../../componentmodules/leads/css/leadtable.component.css', './statreports.component.css'],
	templateUrl: './hotleadtable.component.html'
})
export class HotLeadsComponent implements OnInit, AfterViewInit {
	displayedColumns = []; // Empty variable initialized for the displayed columns on the data table
	selectedLead: InsuranceLead; // selected user (for editing.  Need to add logic where only 1 can be selected at a time)
	displaySettings = HOTLEADSDISPLAY; // set the display settings to those in the table settings file in appdata
	dataSource: HotLeadDataSource | null; // initialize a UserDataSource

	chart2 = []; // This will hold our chart info
	timedata: string[] = [];	// array to hold all displayed data timestamps for x axis
	displaydata: number[] = [];
	leadSources: LeadSource[] = [];
	leadSourceData: Map<string, number>;
	sources: string[] = [];
	leadSourceCount: number[] = [];
	leadCount = 0;
	date: Date;
	lastDate: Date;
	selected = 100;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(
		private statReportService: StatReportsService,
		private referenceDataConverter: ReferenceDataConverter,
		private http: HttpClient,
		public dialog: MatDialog,

	) {
		this.referenceDataConverter.loadData().subscribe(result => {
			this.leadSources = this.referenceDataConverter.getLeadSources();
			this.buildData();
		});
	}

	ngOnInit() {
		this.displayedColumns = this.displaySettings.map(x => x.columnDef );
		this.dataSource = new HotLeadDataSource(this.statReportService, this.paginator, this.referenceDataConverter);
		this.dataSource.loadLeads('', 10, this.paginator.pageIndex);
	}

	ngAfterViewInit() {
		this.paginator.page.pipe(
			tap(() => this.loadLeadPage())
		).subscribe();
	}

	loadLeadPage() {
		this.dataSource.loadLeads(
			'asc', this.paginator.pageSize, this.paginator.pageIndex
		);
	}

	openLeadDetail(lead: InsuranceLead) {
		const dialogRef = this.dialog.open(LeadComponent, {
			data: {
				'lead': lead
			},
			width: '95%',
			maxWidth: '100%'
		});
		// reload table and reset selection
		dialogRef.afterClosed().subscribe(result => {
			this.loadLeadPage();
		});
	}

	buildData() {
		// clear old data
		this.timedata = [];
		this.displaydata = [];
		this.sources = [];
		this.leadSourceCount = [];
		this.leadCount = 0;

		this.statReportService.getAllHotLeads().subscribe(response => {
			const hotLeadArray = response['_embedded']['insuranceleads'];
			hotLeadArray.forEach((lead, idx, arr) => {
				this.date = new Date(lead.estClosingDate);
				if (this.leadCount === 0) {
					this.lastDate = this.date;
				}
				if (this.compareTime(this.date, this.lastDate)) {
					this.displaydata.unshift(this.leadCount);
					this.timedata.unshift(this.lastDate.toLocaleDateString());
					this.leadCount = 1;
					this.lastDate = this.date;

				} else {
					this.leadCount++;
				}
				if (idx === arr.length - 1) {
					this.displaydata.unshift(this.leadCount);
					this.timedata.unshift(this.lastDate.toLocaleDateString());
				}
			});
			this.buildChart();
		});
	}


	buildChart() {
		this.chart2 = new Chart('canvas2', {
			type: 'line',
			data: {
				labels: this.timedata,
				datasets: [
					{
						data: this.displaydata,
						borderColor: 'red',
						fill: false,
						label: 'Hot Leads'
					}
				]
			},
			response: true,
			options: {
				title: {
					display: true,
					text: 'Hot lead estimated closing dates (Currently ' + this.leadCount + ' hot leads)'
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
							labelString: '# Leads'
						}
					}]
				}
			}
		});
	}

	/**********SERVICE FUNCTIONS ************** */

	getLeadSourceData(lead: UnfilteredInsuranceLead) {
		if (this.leadSourceData.has(lead.leadSourceId)) {
			this.leadSourceData.set(lead.leadSourceId.toString(), (this.leadSourceData.get(lead.leadSourceId) + 1));
		} else { this.leadSourceData.set(lead.leadSourceId.toString(), 1); }
	}

	compareTime(time1: Date, time2: Date) {
		if (time1 < time2) { /* console.log(time1.toDateString + ' is before ' + time2.toDateString); */ }
		if (time1.getDay() === time2.getDay()) { /* console.log('Still the same day!'); */ }
		if ((time1 < time2) && (time1.getDay() !== time2.getDay())) { return true; }
	}
}

