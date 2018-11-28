import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserComponent } from './users/users.component';
import { EmailTemplateComponent } from './emailtemplates/emailtemplates.component';
import { EmailLogRepoComponent } from './emaillogs/emaillog.component';
import { AuthGuard } from '../../services/authorization.guard.service';

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'users',
				component: UserComponent
			},
			{
				path: 'emailtemplates',
				component: EmailTemplateComponent
			},
			{
				path: 'emaillogs',
				component: EmailLogRepoComponent
			},
		]
	},
	{
		path: '',
		redirectTo: '/admin',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
	RouterModule.forChild(adminRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class AdminRoutingModule { }
