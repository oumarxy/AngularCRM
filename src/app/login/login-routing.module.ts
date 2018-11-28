import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
	RouterModule.forChild(loginRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class LoginRoutingModule { }
