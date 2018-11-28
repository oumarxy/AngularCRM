import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../services/authorization.guard.service';
// import { LeadComponent } from '../../componentmodules/leaddetail/lead.component';

const dashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	/*{
		path: 'insuranceleads/:id',
		component: LeadComponent,
		canActivate: [AuthGuard]
	}*/
];

@NgModule({
  imports: [
	RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class DashboardRoutingModule { }
