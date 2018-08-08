import { Pipe, PipeTransform } from '@angular/core';
import { timeAgoRecent } from '../helper/time-ago-recent';

@Pipe({ name: 'timeAgoRecent' })
export class TimeAgoRecentPipe implements PipeTransform {
  transform(value: string | number | Date): string | number | Date {
    if (typeof value === 'string') {
      return timeAgoRecent(value);
    } else {
      return value;
    }
  }
}
