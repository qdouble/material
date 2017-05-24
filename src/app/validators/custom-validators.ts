/* tslint:disable: triple-equals */
import { FormControl, FormGroup } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

export class CustomValidators {

  static compare(c1Key: string, c2Key: string, errorMsg: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any; } => {
      let c1 = group.get(c1Key) || { value: null };
      let c2 = group.get(c2Key) || { value: null };
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

export function requiredIfGroup(mainControl: string,
  otherControls: string[], errMessage: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any; } => {
    let requiredErr: boolean = false;
    for (let control of otherControls) {
      if (group.get(mainControl).value) {
        if (isBlank(group.get(control).value) || (typeof group.get(control).value === 'string'
          && group.get(control).value == '')) {
          requiredErr = true;
          break;
        }
      }
    };
    return (requiredErr) ?
      { [errMessage]: true } :
      <any>null;
  };
};

export function requiredIfCondition(condition: boolean,
  otherControls: string[], errMessage: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any; } => {
    let requiredErr: boolean = false;
    for (let control of otherControls) {
      if (condition) {
        if (isBlank(group.get(control).value) || (typeof group.get(control).value === 'string'
          && group.get(control).value == '')) {
          requiredErr = true;
          break;
        }
      }
    };
    return (requiredErr) ?
      { [errMessage]: true } :
      <any>null;
  };
};
