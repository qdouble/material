import { ChangeDetectionStrategy , Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'textarea-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./textarea-input.html')
})

export class TextareaInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() help: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.controls[this.controlName];
  }
}
