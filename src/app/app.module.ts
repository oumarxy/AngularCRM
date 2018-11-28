import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './services/jwt.intercept';
import { CachingInterceptor } from './services/caching.intercept';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { RequestCacheWithMap, RequestCache } from './services/request-cache.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/authorization.service';
import { AuthGuard } from './services/authorization.guard.service';
import { TinyMceModule } from 'angular-tinymce';
import { tinymceDefaultSettings } from 'angular-tinymce';
import { ReferenceDataConverter } from './services/referencedataconverter.service';
import { DashboardModule } from './tabmodules/dashboard/dashboard.module';
import { StatReportsModule } from './tabmodules/statreports/statreports.module';
import { LeadDatabaseModule } from './tabmodules/leads/leads.module';
import { PolicyDatabaseModule } from './tabmodules/policydatabase/policydatabase.module';
import { CustomerDatabaseModule } from './tabmodules/customerdatabase/customerdatabase.module';
import { AdminModule } from './tabmodules/admin/admin.module';
import { EmailModule } from './tabmodules/email/email.module';
import { SearchPageModule } from './tabmodules/searchpage/searchpage.module';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		TinyMceModule.forRoot(tinymceDefaultSettings),
		PolicyDatabaseModule,
		FormsModule,
		LoginModule,
		AdminModule,
		CoreModule,
		DashboardModule,
		// LeadTableModule,
		EmailModule,
		CustomerDatabaseModule,
		StatReportsModule,
		LeadDatabaseModule,
		SearchPageModule,
		AppRoutingModule // This must be last for the routes to work.  Otherwise modules load out of order
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		},
		MessageService,
		{ provide: RequestCache, useClass: RequestCacheWithMap },
		AuthService,
		AuthGuard,
		ReferenceDataConverter,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
