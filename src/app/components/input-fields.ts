import { Component, Input, Output, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { DebounceInputControlValueAccessor } from '../validators';

@Component({
  selector: 'email-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-group">
      <label>{{label}}</label>
      <input type="email" [formControl]="dynamicControl" class="form-control">
      <button *ngIf="submit" type="submit" [disabled]="!form.valid">{{submit}}</button>
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      !dynamicControl.errors?.required" class="alert alert-danger">
      {{label}} is required.
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      dynamicControl.errors?.required" class="alert alert-danger">
      {{errorMessage}}
    </div>    
    `
})

export class EmailInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() submit: string;
  @ViewChild(Input) myInput;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.controls[this.controlName];
  }
}

@Component({
  selector: 'text-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-group">
      <label>{{label}}</label>
      <input type="text" [formControl]="dynamicControl" class="form-control">
      <button *ngIf="submit" type="submit" [disabled]="!form.valid">{{submit}}</button>
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      !dynamicControl.errors?.required" class="alert alert-danger">
      {{label}} is required.
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      dynamicControl.errors?.required" class="alert alert-danger">
      {{errorMessage}}
    </div> 
    `
})

export class TextInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.controls[this.controlName];
  }
}

@Component({
  selector: 'debounce-input',
  directives: [REACTIVE_FORM_DIRECTIVES, DebounceInputControlValueAccessor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-group">
      <label>{{label}}</label>
      <input [debounceTime]="300" type="text" [formControl]="dynamicControl" class="form-control">
      <button *ngIf="submit" type="submit" [disabled]="!form.valid">{{submit}}</button>
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      !dynamicControl.errors?.required" class="alert alert-danger">
      {{label}} is required.
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      dynamicControl.errors?.required" class="alert alert-danger">
      {{errorMessage}}
    </div> 
    `
})

export class DebounceInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.controls[this.controlName];
  }
}

@Component({
  selector: 'password-input',
  directives: [REACTIVE_FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-group">
      <label>{{label}}</label>
      <input type="password" [formControl]="dynamicControl" class="form-control">
      <button *ngIf="submit" type="submit" [disabled]="!form.valid">{{submit}}</button>
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      !dynamicControl.errors?.required" class="alert alert-danger">
      {{label}} is required.
    </div>
    <div [hidden]="dynamicControl.valid || dynamicControl.untouched || 
      dynamicControl.errors?.required" class="alert alert-danger">
      {{errorMessage}}
    </div> 
    `
})

export class PasswordInput {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.controls[this.controlName];
  }
}

export const INPUT_FIELDS = [EmailInput, TextInput, PasswordInput, DebounceInput];
