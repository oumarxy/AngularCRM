
import { StatReportsRoutingModule } from './statreports.routing.module';
import { StatReportsComponent } from './statreports.component';
import { StatReportsService } from './statreports.service';
import { HotLeadsComponent } from './hotleadstable.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/authorization.service';
import { AuthGuard } from '../../services/authorization.guard.service';
import { ReferenceDataConverter } from '../../services/referencedataconverter.service';
import { HttpClient } from '@angular/common/http';
import { IncomingLeadsComponent } from './incomingleads.component';

@NgModule({
	imports: [
		SharedModule,
		MaterialModule,
		StatReportsRoutingModule,
		BrowserAnimationsModule,
	  ],
	declarations: [
		StatReportsComponent,
		IncomingLeadsComponent,
		HotLeadsComponent
	],
	providers: [ AuthService, AuthGuard, HttpClient, StatReportsService, ReferenceDataConverter ],
	exports: [
		StatReportsComponent,
		HotLeadsComponent,
		IncomingLeadsComponent,
	],
	entryComponents: []
})

export class StatReportsModule { }
