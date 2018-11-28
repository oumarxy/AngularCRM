// 404 Not Found component. This is displayed whenever the router cannot find a route specified by the application or browser.
import { Component } from '@angular/core';

@Component({
	selector: 'app-notfound',
	styles: [
		`.container-fluid {
			margin-top: 64px;
			text-align: center;
		}`
	],
	template: `
		<div class="container-fluid">
			<div class="page-header">
				<h1>404: page not found</h1>
			</div>
			<div>
				<p>The page you are looking for cannot be found or does not exist.</p>
				<p>If you believe there should be a page here, please contact your network administrator</p>
			</div>
		</div>
	`
})
export class NotFoundComponent { }
