import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.html'
})

export class NumberInput implements OnInit {
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
    this.dynamicControl = this.form.get(this.controlName);
  }
}
