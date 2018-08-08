import { Pipe, PipeTransform } from '@angular/core';
import { timeAgo } from '../helper/time-ago';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | number | Date): string | number | Date {
    if (typeof value === 'string') {
      return timeAgo(value);
    } else {
      return value;
    }
  }
}
