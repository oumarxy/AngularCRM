import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { DatePipe } from '@angular/common';
import { CustomerDatabaseComponent } from './customerdatabase.component';
import { CustomerModule } from '../../componentmodules/customers/customer.module';
import { DuplicateService } from '../../componentmodules/customers/duplicateResolution/resolveduplicate.service';
import { CustomerService } from '../../componentmodules/customers/customer.service';
import { CustomerDatabaseRoutingModule } from './customerdatabase-routing.module';

@NgModule({
	imports: [
		SharedModule,
		MatDialogModule,
		CustomerDatabaseRoutingModule,
		CustomerModule
	  ],
	declarations: [
		CustomerDatabaseComponent
	],
	providers: [ AuthService, AuthGuard, DuplicateService, DatePipe, CustomerService ],
	exports: [
		CustomerDatabaseComponent

	],
	entryComponents: [
	]
})
export class CustomerDatabaseModule { }
