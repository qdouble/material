import { ElementRef, Renderer } from '@angular/core';
export declare class MdChip {
    protected _renderer: Renderer;
    protected _elementRef: ElementRef;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    ngAfterContentInit(): void;
}
