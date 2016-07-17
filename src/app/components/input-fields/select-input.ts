import { ChangeDetectionStrategy , Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'select-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./select-input.html')
})

export class SelectInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() optionValues: (string | number)[];
  @Input() optionLabels: string[];
  @Input() help: string;
  @Input() label: string;
  @Input() submit: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.dynamicControl = this.form.controls[this.controlName];
  }
}
