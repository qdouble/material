import { ChangeDetectionStrategy , Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'password-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './password-input.html'
})

export class PasswordInput implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || (this.name || 'Password') + ' is invalid';
    this.dynamicControl = this.form.get(this.controlName);
  }
}
