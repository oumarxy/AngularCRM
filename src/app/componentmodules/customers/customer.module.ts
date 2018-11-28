import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { CustomerComponent } from './customer.component';
import { EditCustomerComponent } from './dialogboxes/editcustomer.dialog.component';
import { AddCustomerComponent } from './dialogboxes/addcustomer.dialog.component';
import { DeleteCustomerComponent } from './dialogboxes/deletecustomer.dialog.component';
import { CustomerFilterComponent } from './dialogboxes/filtercustomer.dialog.component';
import { CustomerClearFilterComponent } from './dialogboxes/clearcustomerfilters.dialog.component';
import { DuplicateResolutionComponent } from './duplicateResolution/resolveduplicate.component';
import { DuplicateFormatCellPipe } from './duplicateResolution/duplicate-format-cell-pipe';
import { DuplicateStyleCellDirective } from './duplicateResolution/duplicate-style-cell.directive';
import { DuplicateService } from './duplicateResolution/resolveduplicate.service';
import { DatePipe } from '@angular/common';
import { CustomerService } from './customer.service';
import { CustomerLeadsComponent } from './customerlead.component';

@NgModule({
	imports: [
		SharedModule,
		MatDialogModule,
	  ],
	declarations: [
		AddCustomerComponent,
		EditCustomerComponent,
		DeleteCustomerComponent,
		CustomerComponent,
		AddCustomerComponent,
		EditCustomerComponent,
		DeleteCustomerComponent,
		CustomerFilterComponent,
		CustomerClearFilterComponent,
		DuplicateResolutionComponent,
		DuplicateFormatCellPipe,
		DuplicateStyleCellDirective,
		CustomerLeadsComponent
	],
	providers: [ AuthService, AuthGuard, DuplicateService, DatePipe, CustomerService ],
	exports: [
		AddCustomerComponent,
		EditCustomerComponent,
		DeleteCustomerComponent,
		CustomerComponent,
		AddCustomerComponent,
		EditCustomerComponent,
		DeleteCustomerComponent,
		CustomerFilterComponent,
		CustomerClearFilterComponent,
		DuplicateResolutionComponent,
		DuplicateFormatCellPipe,
		DuplicateStyleCellDirective,
		CustomerLeadsComponent
	],
	entryComponents: [
		AddCustomerComponent,
		EditCustomerComponent,
		DeleteCustomerComponent,
		AddCustomerComponent,
		EditCustomerComponent,
		DeleteCustomerComponent,
		CustomerFilterComponent,
		CustomerClearFilterComponent,
		DuplicateResolutionComponent,
		CustomerLeadsComponent
	]
})
export class CustomerModule { }
