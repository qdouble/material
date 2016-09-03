import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {  AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'debounce-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './debounce-input.html'
})

export class DebounceInput implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.get(this.controlName);
  }
}
