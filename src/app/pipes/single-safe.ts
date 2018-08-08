import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'singleSafe' })
export class SingleSafePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value === 'string' && value.slice(-1) === 's') {
      return value.slice(0, -1) + '(s)';
    }
    return value;
  }
}
