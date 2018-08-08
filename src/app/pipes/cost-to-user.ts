import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'costToUser' })
export class CostToUserPipe implements PipeTransform {
  transform(value: number | string): number | string {
    switch (value) {
      case 0:
        return 'Free';
      case -1:
        return 'Varies';
      default:
        return value;
    }
  }
}
