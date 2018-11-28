import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from '../../services/authorization.guard.service';
import { PolicyDatabaseComponent } from './policydatabase.component';

const policyRoutes: Routes = [
	{
		path: 'policies',
		component: PolicyDatabaseComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/policies',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
	RouterModule.forChild(policyRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class PolicyDatabaseRoutingModule { }
