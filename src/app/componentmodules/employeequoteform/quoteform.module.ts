import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { QuoteFormComponent } from './quoteform.component';
import { QuoteFormService } from './quoteform.service';

@NgModule({
	imports: [
		SharedModule,
		MatDialogModule,
	  ],
	declarations: [
		QuoteFormComponent
	],
	providers: [ AuthService, AuthGuard, QuoteFormService ],
	exports: [
		QuoteFormComponent
	],
	entryComponents: [
	]
})
export class QuoteFormModule { }
