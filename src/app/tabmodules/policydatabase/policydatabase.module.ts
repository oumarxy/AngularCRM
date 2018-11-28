import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PolicyDatabaseComponent } from './policydatabase.component';
import { PolicyDatabaseRoutingModule } from './policydatabase-routing.module';

@NgModule({
	imports: [
		SharedModule,
		PolicyDatabaseRoutingModule
	  ],
	declarations: [
		PolicyDatabaseComponent
	],
	providers: [
	],
	exports: [
		PolicyDatabaseComponent
	],
	entryComponents: [
	]
})
export class PolicyDatabaseModule { }
