import {
  Component, Input, OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'os-form-input',
  templateUrl: './form-input.html',
  styles: [` md-input-container { width: 100% } `],
  encapsulation: ViewEncapsulation.Emulated
})

export class FormInput implements OnInit {
  @Input() autocomplete: 'off' | null = null;
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() submit: string;
  @Input() type: string = null;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || (this.name || 'Email') + ' is invalid';
    this.dynamicControl = this.form.get(this.controlName);
  }
}
