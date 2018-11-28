import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material';
import { DataTableModule } from '../../../shared/datatable/datatable.module';
import { DeadLeadReasonsComponent, AddDeadLeadReasonComponent } from './deadleadreasons/deadleadreasons.component';
import { DeadLeadReasonService } from './deadleadreasons/deadleadreasons.service';
import { HomeTypeComponent, AddHomeTypeComponent } from './hometypes/hometypes.component';
import { HomeTypeService } from './hometypes/hometypes.service';
import { InsurerComponent, AddInsurerComponent } from './insurers/insurers.component';
import { InsurerService } from './insurers/insurers.service';
import { LeadSourceComponent, AddLeadSourceComponent } from './leadsource/leadsource.component';
import { LeadSourceService } from './leadsource/leadsource.service';
import { LeadStatusComponent, AddLeadStatusComponent } from './leadstatus/leadstatus.component';
import { LeadStatusService } from './leadstatus/leadstatus.service';
import { PhoneTypeComponent, AddPhoneTypeComponent } from './phonetypes/phonetypes.component';
import { PhoneTypeService } from './phonetypes/phonetypes.service';
import { ReferralComponent, AddReferralComponent } from './referrals/referrals.component';
import { ReferralService } from './referrals/referrals.service';
import { RoleComponent, AddRoleComponent } from './roles/roles.component';
import { RoleService } from './roles/roles.service';
import { RoofTypesComponent, AddRoofTypeComponent } from './rooftypes/rooftypes.component';
import { RoofTypeService } from './rooftypes/rooftypes.service';
import { SidingTypesComponent, AddSidingTypeComponent } from './sidingtypes/sidingtypes.component';
import { SidingTypeService } from './sidingtypes/sidingtypes.service';
import { TodayActivityComponent, AddTodayActivityComponent } from './todayactivities/todayactivities.component';
import { TodayActivityService } from './todayactivities/todayactivity.service';
import { TodayActivityGroupComponent, AddTodayActivityGroupComponent } from './todayactivitygroups/todayactivitygroups.component';
import { TodayActivityGroupService } from './todayactivitygroups/todayactivitygroups.service';
import { ZonesComponent, AddZoneComponent } from './zones/zones.component';
import { ZoneService } from './zones/zones.service';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		MatIconModule,
		DataTableModule
	  ],
	declarations: [
		DeadLeadReasonsComponent, AddDeadLeadReasonComponent,
		HomeTypeComponent, AddHomeTypeComponent,
		InsurerComponent, AddInsurerComponent,
		LeadSourceComponent, AddLeadSourceComponent,
		LeadStatusComponent, AddLeadStatusComponent,
		PhoneTypeComponent, AddPhoneTypeComponent,
		ReferralComponent, AddReferralComponent,
		RoleComponent, AddRoleComponent,
		RoofTypesComponent, AddRoofTypeComponent,
		SidingTypesComponent, AddSidingTypeComponent,
		TodayActivityComponent, AddTodayActivityComponent,
		TodayActivityGroupComponent, AddTodayActivityGroupComponent,
		ZonesComponent, AddZoneComponent

	],
	providers: [
		DeadLeadReasonService, HomeTypeService,
		InsurerService, LeadSourceService,
		LeadStatusService, PhoneTypeService,
		ReferralService, RoleService,
		RoofTypeService, SidingTypeService,
		TodayActivityService, TodayActivityGroupService,
		ZoneService
	],
	exports: [
		DeadLeadReasonsComponent, AddDeadLeadReasonComponent,
		HomeTypeComponent, AddHomeTypeComponent,
		InsurerComponent, AddInsurerComponent,
		LeadSourceComponent, AddLeadSourceComponent,
		LeadStatusComponent, AddLeadStatusComponent,
		PhoneTypeComponent, AddPhoneTypeComponent,
		ReferralComponent, AddReferralComponent,
		RoleComponent, AddRoleComponent,
		RoofTypesComponent, AddRoofTypeComponent,
		SidingTypesComponent, AddSidingTypeComponent,
		TodayActivityComponent, AddTodayActivityComponent,
		TodayActivityGroupComponent, AddTodayActivityGroupComponent,
		ZonesComponent, AddZoneComponent



	],
	entryComponents: [
		AddDeadLeadReasonComponent,
		AddHomeTypeComponent,
		AddInsurerComponent,
		AddLeadSourceComponent,
		AddLeadStatusComponent,
		AddPhoneTypeComponent,
		AddReferralComponent,
		AddRoleComponent,
		AddRoofTypeComponent,
		AddSidingTypeComponent,
		AddTodayActivityComponent,
		AddTodayActivityGroupComponent,
		AddZoneComponent

	]
})
export class ReferenceFilesModule { }
