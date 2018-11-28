import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from '../../services/authorization.guard.service';
import { CustomerDatabaseComponent } from './customerdatabase.component';

const customerRoutes: Routes = [
	{
		path: 'customers',
		component: CustomerDatabaseComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/customers',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
	RouterModule.forChild(customerRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class CustomerDatabaseRoutingModule { }
