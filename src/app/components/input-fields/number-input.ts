import { ChangeDetectionStrategy , Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'number-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./number-input.html')
})

export class NumberInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() error: string;
  @Input() help: string;
  @Input() label: string;
  @Input() min: number;
  @Input() max: number;
  @Input() submit: string;
  @Input() step: (number | string) = 'any';
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.controls[this.controlName];
  }
}
