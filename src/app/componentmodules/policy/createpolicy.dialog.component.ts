import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
import { InsuranceLead, Policy, Insurer, UnfilteredInsuranceLead } from '../../appdata/datamodels';
import { DocumentService } from '../documents/documents.service';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { PolicyService } from './policy.service';
import { LeadService } from '../leads/lead.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-createpolicy',
	templateUrl: './createpolicy.dialog.component.html',
	styleUrls: [],
	styles: [
		`#documentDisplay {
			width: 100%;
			height: 100%;
		}
		#createPolicyContainer {
			margin-top: 20px;
		}
		.inputfield {
			width: 100%
		}`
	]
  })
  export class PolicyCreateComponent implements OnInit, AfterViewInit {
	insuranceLead: InsuranceLead;
	lead: UnfilteredInsuranceLead;
	policy: Policy;
	userId: string;
	insurers: Insurer[];
	documentsComplete = false;

	constructor(
		public dialogRef: MatDialogRef<PolicyCreateComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private leadService: LeadService,
		private referenceDataConverter: ReferenceDataConverter,
		private documentService: DocumentService,
		private policyService: PolicyService
	) {
		this.insurers = this.referenceDataConverter.getInsurers();
		this.policy = new Policy();
		this.insuranceLead = data.lead;
		// this.lead = data.lead;
		this.userId = JSON.parse(localStorage.getItem('user')).id;
	}

	ngOnInit() {
		this.documentService.getDocumentsByInsuranceLeadId(this.insuranceLead.id).subscribe(res => {
			if (res['page']['totalElements'] !== 0) {
				this.documentsComplete = true;
			} else {
				this.documentsComplete = false;
			}
		});
		this.leadService.getLeadById(this.insuranceLead.id).subscribe(response => {
			this.lead = response;
		});
	}

	ngAfterViewInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	documentationComplete() { return this.documentsComplete; }
	// call API service edit function
	createPolicy() {
		// translate all lead id data first
		// this.policyLead = this.referenceDataConverter.convertReferenceIdsToValue(this.policyLead);
		this.referenceDataConverter.convertReferenceIdsToValue(this.lead);
		// assign all values to the policy
		this.policy.customerId = this.lead.customerId;
		this.policy.userId = this.userId;
		this.policy.leadId = this.lead.id;
		// create the policy.  Note the policy id will be added to the insurance lead in the leadService file,
		// so the insuranceLead needs to be passed to the function as well
		this.policyService.createPolicy(this.policy).subscribe(policyResponse => {
			this.lead.policyId = policyResponse['id'];
			this.leadService.updateLead(this.lead).subscribe(res => res);
			this.documentService.getDocumentsByInsuranceLeadId(this.lead.id).subscribe(res => {
				res['_embedded']['storedfiles'].forEach(document => {
					document.policyId = policyResponse['id'];
					this.documentService.updateDocument(document).subscribe(documentResponse => documentResponse);
				});
			}, err => {
			});
		});
	}

}
