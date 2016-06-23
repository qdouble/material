import { 
    Component, 
    ChangeDetectionStrategy, 
    ChangeDetectorRef,
    Input
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Validators } from '@angular/common';
import { FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, FormGroupName } from '@angular/forms';

@Component({
    selector: 'input-field',
    directives: [REACTIVE_FORM_DIRECTIVES],
    template: `
    <label>{{label}}</label>
    <form [formGroup]="form">
    <input [formControlName]=label>
    </form>
    `,
    // changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputField {
    @Input() label;
    @Input() form: FormGroup;
    @Input() name;
    
    myControl = new FormControl('My Username');
    ngOnInit() {
        console.log('label:', this.label)
        this.form.addControl(this.label, this.myControl)
    }
    ngAfterViewInit() {
        console.log('ngAfterViewInit label', this.label)
    }
}