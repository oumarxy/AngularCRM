import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';


@NgModule({
	imports: [
			BrowserModule,
			HttpClientModule,
			FormsModule,
			LoginRoutingModule
		],
	declarations: [ LoginComponent ],
	exports: [ LoginComponent ],
	providers: [ LoginService ]
})
export class LoginModule { }
