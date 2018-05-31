/* tslint:disable */
import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

@Directive({
  selector: '[debounceTime]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: DebounceInputControlValueAccessor, multi: true }
  ]
})
export class DebounceInputControlValueAccessor implements ControlValueAccessor {
  onChange = _ => {};
  onTouched = () => {};
  @Input() debounceTime: number;
  destroyed$: Subject<any> = new Subject<any>();

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) {}

  ngAfterViewInit() {
    fromEvent(this._elementRef.nativeElement, 'keyup')
      .pipe(takeUntil(this.destroyed$), debounceTime(this.debounceTime))
      .subscribe((event: any) => {
        this.onChange(event.target.value);
      });
  }

  writeValue(value: any): void {
    var normalizedValue = isBlank(value) ? '' : value;
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: () => any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
