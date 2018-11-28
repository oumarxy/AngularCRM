import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailComponent } from './email.component';
import { AuthGuard } from '../../services/authorization.guard.service';

const emailRoutes: Routes = [
	{
		path: 'email',
		component: EmailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/email',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
	RouterModule.forChild(emailRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class EmailRoutingModule { }
