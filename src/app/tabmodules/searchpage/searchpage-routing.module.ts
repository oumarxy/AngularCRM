import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from '../../services/authorization.guard.service';
import { SearchPageComponent } from './searchpage.component';

const searchRoutes: Routes = [
	{
		path: 'search',
		component: SearchPageComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/search',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
	RouterModule.forChild(searchRoutes)
  ],
  exports: [
	RouterModule
  ]
})
export class SearchPageRoutingModule { }
