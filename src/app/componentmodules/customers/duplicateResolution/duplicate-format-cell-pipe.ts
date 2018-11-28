import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'duplicateFormat' })
export class DuplicateFormatCellPipe implements PipeTransform {
	// static readonly DATE_FORMAT =
	constructor(private datePipe: DatePipe) {}
	transform(value: any) {
		if (value === undefined || value === 'null' || value === '' || value === null ) {
			return 'not available';
		}
		if (isNaN(value) && Date.parse(value) ) {	// check if value is not a number, but also a date string
			return this.datePipe.transform(value, 'short');
		}

		return value;
	}
}
