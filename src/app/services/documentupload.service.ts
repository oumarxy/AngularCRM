import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PATH } from './services.config';
import { InsuranceLead } from '../appdata/datamodels';

@Injectable()
export class DocumentUploadService {
	private readingFile: boolean;
	constructor(private http: HttpClient) {}

	public upload(files: Set<File>, selectedLead: InsuranceLead): {[key: string]: Observable<number>} {
		// this will be the our resulting map
		const status = {};

		files.forEach(file => {
			// create a new multipart-form for every file
			// const formData: FormData = new FormData();
			// formData.append('file', file, file.name);
			// create a http-post request and pass the form
			// tell it to report the upload progress
			const fileReader: FileReader = new FileReader();

			// const file = event.target.files[0];
			if (selectedLead.policyId === null) {
				selectedLead.policyId = '';
			}
			const documentData = {
				'customerId' : selectedLead.customerId,
				'insuranceLeadId' : selectedLead.id,
				'policyId' : selectedLead.policyId,
				'contentBytes': '',
				'contentType' : file.type,
				'dateTimeLastModified' : file.lastModifiedDate.toISOString(),
				'name': file.name,
				'size' : file.size
			};
			const progress = new Subject<number>();

			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				documentData.contentBytes = fileReader.result.split(',')[1];
				const req = new HttpRequest('POST', PATH + '/filestore', documentData, {
					// const req = new HttpRequest('POST', url, documentData, {
						reportProgress: true
				});
				// send the http-request and subscribe for progress-updates
				this.http.request(req).subscribe(event => {
					if (event.type === HttpEventType.UploadProgress) {
						// calculate the progress percentage
						const percentDone = Math.round(100 * event.loaded / event.total);
						// pass the percentage into the progress-stream
						progress.next(percentDone);
					} else if (event instanceof HttpResponse) {
						// Close the progress-stream if we get an answer form the API
						// The upload is complete
						progress.complete();
					} else {
					}
				});
			};
			// Save every progress-observable in a map of all observables
			status[file.name] = {
				progress: progress.asObservable()
			};
		});
		// return the map of progress.observables
		return status;
	}
}
