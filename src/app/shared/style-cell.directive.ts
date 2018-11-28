import { Directive, ElementRef, Input, Renderer2, OnInit, Output, EventEmitter } from '@angular/core';
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[ctStyleCell]'})
export class StyleCellDirective implements OnInit {
	@Input() ctStyleCell: string;
	@Input() displayHeader: string;
	@Output() duplicateEvent: EventEmitter<String> = new EventEmitter<string>();
	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		if (this.ctStyleCell === undefined || this.ctStyleCell === 'null' || this.ctStyleCell === '') {
			if (this.displayHeader === 'Last Contacted') {
				this.renderer.setStyle(
					this.el.nativeElement,
					'color',
					'red');
			} else {
				this.renderer.setStyle(
					this.el.nativeElement,
					'color',
					'#dcdcdc');
			}
		}
		if (typeof this.ctStyleCell === 'number') {
			this.renderer.setStyle(
					this.el.nativeElement,
					'text-align',
					'right');
		}
		if (this.displayHeader === 'Email') {
			this.renderer.setStyle(
				this.el.nativeElement,
				'font-size',
				'.8em');
		}
		if (this.displayHeader === 'Possible duplicate?') {
			if (this.ctStyleCell === 'true') {
				this.renderer.setStyle(
					this.el.nativeElement,
					'color',
					'red');
				this.el.nativeElement.textContent = '';
				const icon = this.renderer.createElement('mat-icon');
				const icontext = this.renderer.createText('people');
				this.renderer.addClass(icon, 'mat-icon');
				this.renderer.addClass(icon, 'material-icons');
				this.renderer.listen(icon, 'click', (event) => {
					this.onClick(event);
				});
				this.renderer.appendChild(icon, icontext);
				this.renderer.appendChild(this.el.nativeElement, icon);
			} else {
				this.renderer.setStyle(
					this.el.nativeElement,
					'visibility',
					'hidden'
				);
			}
		}
	}

	onClick($event) {
		this.duplicateEvent.emit('resolveDuplicate');
	}
}
