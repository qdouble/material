import { ChangeDetectionStrategy , Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'select-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./select-input.html')
})

export class SelectInput implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() optionValues: (string | number)[];
  @Input() optionLabels: string[];
  @Input() help: string;
  @Input() label: string;
  @Input() submit: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.dynamicControl = this.form.find(this.controlName);
  }
}
