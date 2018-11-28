import {Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { DashboardService } from './dashboard.service';
import { User } from '../../appdata/datamodels';
import { NavbarService } from '../../core/navbar/navbar.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: [`
		.container-fluid, .container {
			margin-top: 64px;
			padding: 10px 50px;
		}

		h1 {
			margin-bottom: 1.5rem;
		}

		h5 {
			margin-top: 1.5rem;
		}

		#myleads {
			margin-bottom: 100px;
		}`
	],

})
export class DashboardComponent implements OnInit {
	title = 'Dashboard';
	currentUser: User;

	constructor(public nav: NavbarService, public dashservice: DashboardService) {
		if (localStorage.getItem('user') !== null) {
			this.currentUser = JSON.parse(localStorage.getItem('user'));
		}
		this.nav.show();
	}
	ngOnInit() {}
}
