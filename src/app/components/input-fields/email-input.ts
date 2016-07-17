import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'email-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./email-input.html')
})

export class EmailInput {
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
