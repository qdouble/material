import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'earnPerReferral' })
export class EarnPerReferralPipe implements PipeTransform {
  transform(value: number): number {
    return Math.floor(value / 5) * 5;
  }
}
