import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'textarea-input',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TextareaInput, multi: true }
  ],
  templateUrl: './textarea-input.html',
  styles: [`md-textarea { width: 100% }`]
})

export class TextareaInput implements ControlValueAccessor, OnDestroy, OnInit {
  @Input() label: string = '';
  @Input() error: string;
  @Input() help: string;
  @Input() placeholder: string;
  @Input() submit: string;
  controlSub: Subscription;
  dynamicControl = new FormControl();
  errorMessage: string;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
  }

  writeValue(value: any) {
    this.dynamicControl.setValue(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this.controlSub = this.dynamicControl.valueChanges.subscribe(fn);
  }

  registerOnTouched() { }

  ngOnDestroy() {
    if (this.controlSub) this.controlSub.unsubscribe();
  }
}
