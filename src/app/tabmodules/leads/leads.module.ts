import { LeadDatabaseComponent } from './leads.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LeadModule } from '../../componentmodules/leads/lead.module';
import { AllLeadsRoutingModule } from './leads-routing.module';

@NgModule({
	imports: [
		SharedModule,
		AllLeadsRoutingModule,
		// LeadModule
	  ],
	declarations: [
		LeadDatabaseComponent
	],
	providers: [
	],
	exports: [
		LeadDatabaseComponent
	],
	entryComponents: [
	]
})
export class LeadDatabaseModule { }
