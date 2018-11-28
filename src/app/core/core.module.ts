import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { NavbarService } from './navbar/navbar.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserModule,
		FormsModule
	],
	declarations: [
		NavbarComponent,
		FooterComponent,
		NotFoundComponent
	],
	exports: [
		NavbarComponent,
		FooterComponent,
		NotFoundComponent
	],
	providers: [ NavbarService ]
})
export class CoreModule { }
