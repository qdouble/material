import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.html',
  styles: [` md-select { position: relative; top: -6px; } label { margin-right: 7px; } `]
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
    this.dynamicControl = this.form.get(this.controlName);
  }
  sayHello() { }
}
