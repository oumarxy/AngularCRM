import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[duplicateStyleCell]'})
export class DuplicateStyleCellDirective implements OnInit {
	@Input() duplicateStyleCell: string;
	@Input() originalField: string;
	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		if (
			this.duplicateStyleCell === undefined ||
			this.duplicateStyleCell === 'null' ||
			this.duplicateStyleCell === '' ||
			this.duplicateStyleCell === null) {
			this.renderer.setStyle(
				this.el.nativeElement,
				'color',
				'#dcdcdc');
		}
		if (typeof this.duplicateStyleCell === 'number') {
			this.renderer.setStyle(
					this.el.nativeElement,
					'text-align',
					'right');
		}
	}
}
