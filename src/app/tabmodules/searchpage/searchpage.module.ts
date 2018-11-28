import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SearchPageRoutingModule } from './searchpage-routing.module';
import { SearchPageComponent } from './searchpage.component';

@NgModule({
	imports: [
		SharedModule,
		SearchPageRoutingModule
	  ],
	declarations: [
		SearchPageComponent
	],
	providers: [
	],
	exports: [
		SearchPageComponent
	],
	entryComponents: [
	]
})
export class SearchPageModule { }
