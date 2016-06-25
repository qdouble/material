import { FormControl } from '@angular/forms';

export class CustomValidators {
  static isTrue(c: FormControl) {
    return c.value == true ? null : {
      isTrue: {
        valid: false
      }
    }
  }
}