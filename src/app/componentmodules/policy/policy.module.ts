import { NgModule } from '@angular/core';
import { PolicyComponent } from './policy.component';
import { PolicyService } from './policy.service';
import { PolicyCreateComponent } from './createpolicy.dialog.component';
import { PolicyEditComponent } from './editpolicy.dialog.component';
import { PolicyDeleteComponent } from './deletepolicy.dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { CustomerService } from '../customers/customer.service';
import { LeadService } from '../leads/lead.service';
import { PolicyDetailComponent } from './policydetail.component';
import { DocumentModule } from '../documents/documents.module';

@NgModule({
	imports: [
		SharedModule,
		DocumentModule
	  ],
	declarations: [
		PolicyComponent,
		PolicyCreateComponent,
		PolicyEditComponent,
		PolicyDeleteComponent,
		PolicyDetailComponent,
	],
	providers: [ AuthService, AuthGuard, PolicyService, CustomerService, LeadService ],
	exports: [
		PolicyComponent,
		PolicyCreateComponent,
		PolicyEditComponent,
		PolicyDeleteComponent,
		PolicyDetailComponent,
	],
	entryComponents: [
		PolicyCreateComponent,
		PolicyEditComponent,
		PolicyDeleteComponent,
		PolicyDetailComponent
	]
})
export class PolicyModule { }
