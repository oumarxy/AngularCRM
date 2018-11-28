import { OnInit, Component, ViewChild, AfterViewInit, Inject} from '@angular/core';
import { MatPaginator, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { LeadService } from './lead.service';
import { UnfilteredInsuranceLead, InsuranceLead } from '../../appdata/datamodels';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { LeadEditComponent } from './dialogboxes/edit.dialog.component';
import { LeadDeleteComponent } from './dialogboxes/delete.dialog.component';

@Component({
	selector: 'app-leaddetail',
	styleUrls: [
		'./css/lead.component.css'
	],
	templateUrl: './lead.component.html',
})
export class LeadComponent implements OnInit, AfterViewInit {
	id: string;	// lead id
	insuranceLead: UnfilteredInsuranceLead;
	lead: InsuranceLead;
	isLoaded = false;	// is data loaded?



	// paginators
	@ViewChild(MatPaginator) leadPaginator: MatPaginator;

	constructor(
		public dialogRef: MatDialogRef<LeadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private insuranceLeadDetailService: LeadService,
		private referenceDataConverter: ReferenceDataConverter,
		public dialog: MatDialog
	) {
		this.insuranceLead = new UnfilteredInsuranceLead();
		this.lead = data.lead;
		this.id = data.lead.id;
	}

	ngOnInit() {
		this.loadLead();

	}

	ngAfterViewInit() {}

	onNoClick(): void { // closes dialog window if clicked outside box
		this.dialogRef.close();
	  }

	loaded() {
		return this.isLoaded;
	}

	loadLead() {
		this.insuranceLeadDetailService.getLeadById(this.id).subscribe(res => {
			// this.referenceDataConverter.convertReferenceIdsToValue(res);
			this.insuranceLead = res;
		});
	}

	editLead() {
		const dialogRef = this.dialog.open(LeadEditComponent, {
			data: {
				'insuranceLead' : this.insuranceLead
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadLead();
		});
	}

	deleteLead() {
		const dialogRef = this.dialog.open(LeadDeleteComponent, {
			data: {
				'lead': this.insuranceLead
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.loadLead();
		});
	}

	editLeadStatus() {
	}

}
