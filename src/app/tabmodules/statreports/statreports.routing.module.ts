import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { StatReportsComponent } from './statreports.component';
import { AuthGuard } from '../../services/authorization.guard.service';

const statRoutes: Routes = [
	{
		path: 'statreports',
		component: StatReportsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/statreports',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
	RouterModule.forChild(statRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class StatReportsRoutingModule { }
