import { ChangeDetectionStrategy , Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'textarea-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './textarea-input.html'
})

export class TextareaInput implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() error: string;
  @Input() help: string;
  @Input() submit: string;
  errorMessage: string;
  dynamicControl: AbstractControl;

  ngOnInit() {
    this.errorMessage = this.error || this.label + ' is invalid';
    this.dynamicControl = this.form.get(this.controlName);
  }
}
