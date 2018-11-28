import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {DuplicateService} from './resolveduplicate.service';

@Injectable()
export class SettingsGuard { // implements CanActivate {

	constructor(private duplicateService: DuplicateService) {}
	// https://devblog.dymel.pl/2017/04/10/angular-wait-for-resource-to-load/
	canActivate() {
		// Settings will be cached in UsersService
		/*return this.duplicateService
			.getSettings()
			.map(() => true);*/
	}

	/* add to route
		{ path: "orders", loadChildren: "app/orders/orders.module#OrdersModule", canActivate: [SettingsGuard, AuthGuard] },
		*/
}
