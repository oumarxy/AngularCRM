import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-footer',
	template: `<footer class="container-fluid clearfix">
				<div>
					<small class="muted">Copyright © 2018 Factory Expo CRM. All Rights Reserved.</small>
				</div>
				<div>
					<small class="muted">Version: {{ version }}</small>
				</div>
			</footer>`,
	styles: [ `footer {
		flex-shrink: 0;
		width: 100%;
		text-align: center;
		padding-bottom: 15px;
		padding-top: 10px;
		background-color: white;
	}` ]
})

export class FooterComponent implements OnInit {
	public version = environment.VERSION;
	ngOnInit() {
	}
}
