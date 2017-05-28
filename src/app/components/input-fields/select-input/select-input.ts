import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.html',
  styles: [` md-select { position: relative; top: -6px; }
  label { margin-right: 7px; display: inline-table;}
  md-select { overflow: hidden; } .form-group { display: flex; }
  .full-width { width: 100% }`]
})

export class SelectInput implements OnInit {
  @Input() center: boolean;
  @Input() form: FormGroup;
  @Input() fullWidth: boolean;
  @Input() controlName: string;
  @Input() optionValues: (string | number)[];
  @Input() optionLabels: string[];
  @Input() help: string;
  @Input() label: string;
  @Input() submit: string;
  @Input() width: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.dynamicControl = this.form.get(this.controlName);
  }
  sayHello() { }
}
