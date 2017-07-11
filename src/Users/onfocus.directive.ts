import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[onFocus]',
})
export class OnFocusDirective {
    private el: ElementRef;
    constructor(private _el: ElementRef, public renderer: Renderer) {
        this.el = this._el;
    }

    @HostListener('focus', ['$event']) onselect(e) {
        this.renderer.setElementClass(this._el.nativeElement, 'selected', true);
        return;
    }
    @HostListener('blur', ['$event']) onblur(e) {
        this.renderer.setElementClass(this._el.nativeElement, 'selected', false);
        return;
    }
}