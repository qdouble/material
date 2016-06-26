import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms/src/directives/validators';

export class CustomValidators {

  static compare(c1Key: string, c2Key: string, errorMsg: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any;} => {
      let c1 = group.controls[c1Key] || { value: null };
      let c2 = group.controls[c2Key] || { value: null };
      var val: string = group.value;
      var error = {}
      error[errorMsg] = true;
      return (c1.value !== c2.value) ?
                 error :
                 null;
    };
  }

  static isTrue(c: FormControl)  {
    return (c.value == true) ? null : {
      isTrue: {
        valid: false
      }
    }
  }
  
}