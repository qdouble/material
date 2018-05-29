import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'showMax' })
export class ShowMaxPipe implements PipeTransform {
  transform(value: string | number | Date, max: number): string | number | Date {
    if (typeof value === 'number' && value > max) {
      return max;
    } else {
      return value;
    }
  }
}
