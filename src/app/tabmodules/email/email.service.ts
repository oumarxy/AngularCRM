import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailLog, User } from '../../appdata/datamodels';
import { PATH } from '../../services/services.config';

@Injectable()
export class EmailService {
	private emailLog: EmailLog;
	constructor(private http: HttpClient) {}

	copyToEmailRepo(mailToRecepient: string, mailFromRecepient, mailToSubject: string, mailToContent: string) {
		const today = new Date();
		this.emailLog = new EmailLog();
		this.emailLog.toRecipient = mailToRecepient;
		this.emailLog.fromRecipient = mailFromRecepient;
		this.emailLog.subject = mailToSubject;
		this.emailLog.content = mailToContent;
		this.emailLog.sentDate = today;
		this.emailLog.userId = localStorage.getItem('#userid');
		// this.emailLog.leadId = ;
		this.http.post(PATH + '/emaillogs/', this.emailLog).subscribe(res => {
		}, err => {
		});
	}

	private getUserId(query: string) {
		return this.http.get<User>(PATH + '/users/search/findByUserName?userName=' + query)
		.map(res =>  res);
	}

	savePDF(doc: any) {
		this.http.post(PATH + '/filestore', doc).subscribe(res => {
		}, err => {
		});
	}
}
