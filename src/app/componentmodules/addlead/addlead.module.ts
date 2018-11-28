import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { AddLeadComponent } from './addlead.dialog.component';

@NgModule({
	imports: [
		SharedModule,
		MatDialogModule,
	  ],
	declarations: [
		AddLeadComponent
	],
	providers: [ AuthService, AuthGuard, ],
	exports: [
		AddLeadComponent
	],
	entryComponents: [
	]
})
export class AddLeadModule { }
