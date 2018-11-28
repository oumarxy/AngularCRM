import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Msal from 'msal';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EmailService } from './email.service';
import { MatDialog } from '@angular/material';
import { PDFMapperComponent } from './pdfmapper.component';
import { EmailDocument, MicrosoftUser, EmailAttachment } from '../../appdata/datamodels';
import { NavbarService } from '../../core/navbar/navbar.service';
@Component({
	selector: 'app-emailclient',
	styleUrls: [
		'./email.component.css'
	],
	templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
	title = 'app';
	// clientID = 'afeddd24-3c0f-4e6e-8b82-8001d14479ea';
	clientID = '0099206f-418b-419b-bad2-6a94e3d6541f';
	redirectUri = 'http://localhost:4200/email';
	interactionMode = 'popUp';
	graphEndpoint = 'https://graph.microsoft.com/v1.0/me';
	graphScopes = ['user.read user.readwrite mail.send mail.read mail.readwrite'];
	clientApplication;
	// View model properties
	displayName;
	emailAddress;
	emailAddressSent;
	requestSuccess;
	requestFinished;
	private loadingSubject = new BehaviorSubject<boolean>(false);
	public loading$ = this.loadingSubject.asObservable();

	// display variables for inbox
	public inbox: EmailDocument[] = [];
	public selected = false;
	public selectedEmail: EmailDocument;
	public hasAttachments = false;
	public attachments: any;

	user: MicrosoftUser;

	// paging variables
	private nextLink = '';
	private previousLink = '';
	private pageIndex = 0;

	constructor(
		private http: HttpClient,
		private emailService: EmailService,
		public dialog: MatDialog,
		public nav: NavbarService
	) {
		this.nav.display();
		this.clientApplication = this.createApplication();
		this.initAuth();
	}

	ngOnInit() {
		this.selectedEmail = new EmailDocument();
	}

	initAuth() {
		if (localStorage.getItem('token')) {
			this.processAuth();
		}
	}
	// Auth info is saved in localStorage by now, so set the default headers and user properties.
	processAuth() {
		// Add the required Authorization header with bearer token.
		const httpOptions = {
			headers: new HttpHeaders({
			  	'Authorization': localStorage.getItem('token')
			})
		  };
		// this.headers.append('Authorization', localStorage.getItem('token'));
		// This header has been added to identify our sample in the Microsoft Graph service.
		// If extracting this code for your project please remove.
		// this.headers.append('SampleID', 'angular-connect-rest-sample');
		if (localStorage.getItem('outlookuser') === null) {
			this.me().map(res => res).subscribe(data => {
				this.user = data;
				localStorage.setItem('outlook', JSON.stringify(this.user));
				this.displayName = this.user.displayName;
				this.emailAddress = this.user.mail || this.user.userPrincipalName;
				this.loadingSubject.next(false);
				this.getMailFolders();
			});
		} else {
			this.user = JSON.parse(localStorage.getItem('outlook'));
			this.displayName = this.user.displayName;
			this.emailAddress = this.user.mail || this.user.userPrincipalName;
			this.getMailFolders();
		}
	}

	isAuthenticated() {
		return localStorage.getItem('outlookuser') !== null;
	}

	login() {
		this.loadingSubject.next(true);
		this.clientApplication.loginPopup(this.graphScopes).then( idToken => {
			this.clientApplication.acquireTokenSilent(this.graphScopes).then( accessToken => {
				localStorage.setItem('token', accessToken);
				window.location.reload();
			}, error => {
				this.clientApplication.acquireTokenPopup(this.graphScopes).then( accessToken => {
					localStorage.setItem('token', accessToken);
				// tslint:disable-next-line:no-shadowed-variable
				}, error => {
					window.alert('Error acquiring the popup:\n' + error);
				});
			});
		}, error => {
			window.alert('Error during login:\n' + error);
		});
	}

	logout() {
		this.clientApplication.logout();
		localStorage.removeItem('token');
		localStorage.removeItem('outlookuser');
	}

	sendMail(mailToAddress: string, ccRecipient: string, mailToSubject: string, mailToContent: string) {
		let email = {};
		if (ccRecipient !== '') {
			email = {
				Subject: mailToSubject,
				Body: {
					ContentType: 'HTML',
					Content: mailToContent
				},
				ToRecipients: [
					{
						EmailAddress: {
							Address: mailToAddress
						}
					}
				],
				ccRecipients: [
					{
					  EmailAddress: {
						Address: ccRecipient
					  }
					}
				  ]
			};
		} else {
			email = {
				Subject: mailToSubject,
				Body: {
					ContentType: 'HTML',
					Content: mailToContent
				},
				ToRecipients: [
					{
						EmailAddress: {
							Address: mailToAddress
						}
					}
				]
			};
		}
		// Save email address so it doesn't get lost with two way data binding.
		this.emailAddressSent = this.emailAddress;
		this.http.post('https://graph.microsoft.com/v1.0/me/sendMail', { 'message' : email, 'saveToSentItems': true }, {observe: 'response'})
		.map(res => res).subscribe(data => {
			if (data.status === 202) {
				this.requestSuccess = true;
				// save email to email repository
				this.emailService.copyToEmailRepo(mailToAddress, this.emailAddressSent, mailToSubject, mailToContent);
				this.requestFinished = true;
			} else {
				this.requestSuccess = false;
			}
		});
	}

	getMailFolders() {
		// this.http.get('https://graph.microsoft.com/v1.0/me/messages')
		this.http.get('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages')
		.map(res => res).subscribe(data => {
			this.inbox = data['value'];
			this.pageIndex += 10;
		});
	}

	getMailAttachments(mailId: any) {
		// tslint:disable-next-line:max-line-length
		this.http.get('https://graph.microsoft.com/v1.0/me/messages(\'' + mailId + '\')/attachments')
		.map(res => res).subscribe(data => {
			this.attachments = data['value'];
		});
	}

	openPDFMapper(doc: EmailAttachment) {
		const dialogRef = this.dialog.open(PDFMapperComponent, {
			data: {
				'document': doc
			}
		});
		dialogRef.afterClosed().subscribe(result => {});
	}

	selectEmail(mail: EmailDocument) {
		this.selected = true;
		this.selectedEmail = mail;
		if (mail.hasAttachments === true) {
			this.hasAttachments = true;
			this.getMailAttachments(mail.id);
		} else {
			this.hasAttachments = false;
		}
	}

	isSelected() {
		return this.selected;
	}

	documentsAttached() {
		return this.hasAttachments;
	}

	showAttachmentIcon(mail: EmailDocument) {
		return mail.hasAttachments;
	}

	createApplication() {
		const clientApplication = new Msal.UserAgentApplication(
			this.clientID,
			null,
			function(errorDesc, token, error, tokenType) { });
		return clientApplication;
	}

	me(): Observable<MicrosoftUser> {
		return this.http.get<MicrosoftUser>('https://graph.microsoft.com/v1.0/me');
	}

	back() {	// display last ten emails for user inbox
		if (this.pageIndex > 0) {
			this.http.get('https://graph.microsoft.com/v1.0/me/messages?$skip=' + this.pageIndex)
			.map(res => res).subscribe(data => {
				this.inbox = data['value'];
				this.pageIndex -= 10;
			});
		}
	}

	forward() { // display next ten emails for user inbox
		this.http.get('https://graph.microsoft.com/v1.0/me/messages?$skip=' + this.pageIndex)
		.map(res => res).subscribe(data => {
			this.inbox = data['value'];
			this.pageIndex += 10;
		});
	}
}


