import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { DebounceInputControlValueAccessor } from '../../validators';

@Component({
  selector: 'debounce-input',
  directives: [REACTIVE_FORM_DIRECTIVES, DebounceInputControlValueAccessor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./debounce-input.html')
})

export class DebounceInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.controls[this.controlName];
  }
}
