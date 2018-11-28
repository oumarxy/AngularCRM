import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { FormatCellPipe, ShortDatePipe, DateTimePipe } from './format-cell-pipe';
import { StyleCellDirective } from './style-cell.directive';

import { DocumentUploadService } from '../services/documentupload.service';
import { BrowserModule } from '@angular/platform-browser';
import { AnimationsModule } from './animations.module';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		AnimationsModule
	],
	declarations: [
		FormatCellPipe,
		ShortDatePipe,
		DateTimePipe,
		StyleCellDirective,
	],
	exports: [
		CommonModule,
		AnimationsModule,
		FormsModule,
		BrowserModule,
		MaterialModule,
		ReactiveFormsModule,
		FormatCellPipe,
		ShortDatePipe,
		DateTimePipe,
		StyleCellDirective,
	],
	providers: [ DatePipe, CurrencyPipe, DocumentUploadService ],
})
export class SharedModule { }
