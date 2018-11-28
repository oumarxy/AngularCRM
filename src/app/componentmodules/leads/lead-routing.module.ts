import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { CustomerDetailComponent } from '../customerdetail/customerdetail.component';
// import { AuthGuard } from '../../services/authorization.guard.service';

const LeadDetailRoutes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard',
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
	RouterModule.forChild(LeadDetailRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class LeadDetailRoutingModule { }
