import { FormControl, FormGroup } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

export class CustomValidators {

  static compare(c1Key: string, c2Key: string, errorMsg: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any; } => {
      let c1 = group.find(c1Key) || { value: null };
      let c2 = group.find(c2Key) || { value: null };
      let error = {};
      error[errorMsg] = true;
      return (c1.value !== c2.value) ?
                 error :
                 <any>null;
    };
  }

  static isTrue(c: FormControl): any {
    return (c.value === true) ? undefined : {
      isTrue: {
        valid: false
      }
    };
  }
}
