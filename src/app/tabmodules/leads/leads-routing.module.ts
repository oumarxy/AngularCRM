import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from '../../services/authorization.guard.service';
import { LeadTableComponent } from '../../componentmodules/leads/leadtable.component';
import { LeadDatabaseComponent } from './leads.component';
// import { CustomerDetailComponent } from '../../componentmodules/customerdetail/customerdetail.component';

const leadTableRoutes: Routes = [
	{
		path: 'leads',
		component: LeadDatabaseComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/leads',
		pathMatch: 'full'
	},
	/*{
		path: 'customer/:id',
		component: CustomerDetailComponent,
		canActivate: [AuthGuard]
	}*/
];

@NgModule({
  imports: [
	RouterModule.forChild(leadTableRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class AllLeadsRoutingModule { }
