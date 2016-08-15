import { ChangeDetectionStrategy , Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'text-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./text-input.html')
})

export class TextInput implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() error: string;
  @Input() help: string;
  @Input() hideErr: boolean;
  @Input() label: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.get(this.controlName);
  }
}
