import {Component, Directive, Provider, forwardRef, Input, ElementRef, Renderer} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

const DEBOUNCE_INPUT_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => DebounceInputControlValueAccessor), multi: true});

@Directive({
  selector: '[debounceTime]',
  providers: [DEBOUNCE_INPUT_VALUE_ACCESSOR]
})
export class DebounceInputControlValueAccessor implements ControlValueAccessor {
  onChange = (_) => {};
  onTouched = () => {};
  @Input()
  debounceTime:number;

  constructor(private _elementRef: ElementRef, private _renderer:Renderer) {
    
  }
  
  ngAfterViewInit() {
    Observable.fromEvent(this._elementRef.nativeElement, 'keyup')
      .debounceTime(this.debounceTime)
      .subscribe((event: any) => {
        this.onChange(event.target.value);
      })
  }

  writeValue(value: any): void {
    var normalizedValue = isBlank(value) ? '' : value;
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: () => any): void { this.onChange = fn; }
  registerOnTouched(fn: () => any): void { this.onTouched = fn; }
}