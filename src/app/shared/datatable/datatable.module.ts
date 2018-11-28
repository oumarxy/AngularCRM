import { DataService } from './datatable.service';
import { AnimationsModule } from '../../shared/animations.module';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../shared/material.module';

import { SharedModule } from '../../shared/shared.module';
import { DataTableComponent } from './datatable.component';
import { EditComponent } from './dialogboxes/edit.dialog.component';
import { DeleteComponent } from './dialogboxes/delete.dialog.component';
@NgModule({
	imports: [
		MaterialModule,
		AnimationsModule,
		SharedModule
	],
	declarations: [
		DataTableComponent,
		EditComponent,
		DeleteComponent
	],
	providers: [ DataService ],
	exports: [
		DataTableComponent,
		EditComponent,
		DeleteComponent
	],
	entryComponents: [
		EditComponent,
		DeleteComponent
	]
})
export class DataTableModule { }
