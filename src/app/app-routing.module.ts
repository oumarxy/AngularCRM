import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/notfound/notfound.component';
import { AuthGuard } from './services/authorization.guard.service';

const appRoutes: Routes = [
  	{
		path: '**',
		component: NotFoundComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
