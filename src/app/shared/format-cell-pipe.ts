import { PipeTransform, Pipe } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Pipe({ name: 'formatCell' })
export class FormatCellPipe implements PipeTransform {
	// static readonly DATE_FORMAT =
	constructor(private datePipe: DatePipe,
				private currencyPipe: CurrencyPipe) {}
	transform(value: any, args: any) {
		if (value === undefined || value === 'null' || value === '') {
			if (args === 'Last Contacted') {
				return 'Priority!';
			} else if (args === 'Sales Agent') {
				return 'Unassigned';
			} else {
				return 'not available';
			}
		}
		if (args === 'Last Contacted' || args === 'Last Modified' || args === 'Date') {
			return this.datePipe.transform(value, 'short');
		}

		if (args === 'Creation Date') {
			return this.datePipe.transform(value, 'shortDate');
		}

		return value;
	}
}

@Pipe({ name: 'shortDate' })
export class ShortDatePipe implements PipeTransform {
	constructor(private datePipe: DatePipe) {}
	transform(value: any, args: any) {
		if (Date.parse(value)) {
			return this.datePipe.transform(value, 'shortDate');
		}
		return value;
	}
}

@Pipe({ name: 'dateTime' })
export class DateTimePipe implements PipeTransform {
	constructor(private datePipe: DatePipe) {}
	transform(value: any, args: any) {
		if (Date.parse(value)) {
			return this.datePipe.transform(value, 'short');
		}
		return value;
	}
}
