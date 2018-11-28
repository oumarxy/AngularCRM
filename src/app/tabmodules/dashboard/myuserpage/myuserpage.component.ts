import { Component } from '@angular/core';
import { User } from '../../../appdata/datamodels';

@Component({
	selector: 'app-myuserpage',
	styles: [
		`.container {
			margin-top: 64px;
		}
		.row span {
			float:right;
		}
		.row p {
			border-top: 1px solid rgba(0,0,0,.12);
			padding: 5px 0px;
			margin: 0px;
		}
		.row p:hover {
			background: #f5f5f5;
		}`
	],
	template: `<div class="row">
					<div class="col-6">
						<p><b>Username:</b><span>{{ currentUser?.userName }}</span></p>
						<p><b>Name:</b><span>{{ currentUser?.firstName}} {{ currentUser?.lastName}}</span></p>
						<p><b>Email:</b><span>{{ currentUser?.email }}</span></p>
						<p><b>Id:</b><span>{{ currentUser?.id }}</span></p>
						<p><b>Last password reset:</b><span>{{ currentUser?.lastPasswordResetDate }}</span></p>
						<p><b>Last modified:</b><span>{{ currentUser?.modificationTime }}</span></p>
					</div>
					<div class="col-6">
						<p><b>Role Id:</b><span>{{ currentUser?.roleId }}</span></p>
						<p><b>Account enabled:</b><span>{{ currentUser?.userAccountEnabled }}</span></p>
						<p><b>Account locked:</b> <span>{{ currentUser?.userAccountUnlocked }}</span></p>
						<p><b>Created:</b><span>{{ currentUser?.creationTime }}</span></p>
					</div>
				</div>`
})
export class MyUserComponent {
	currentUser: User;
	constructor() {
		if (localStorage.getItem('user') !== null) {
			this.currentUser = JSON.parse(localStorage.getItem('user'));
		}
	}
}
