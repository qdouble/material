import {
  animate,
  style,
  transition,
  trigger,
  keyframes,
  AnimationTriggerMetadata
} from '@angular/animations';

export function spinScaleAnimation(
  transitionSting: string,
  delay: number,
  speed: number,
  degrees: number
): AnimationTriggerMetadata {
  return trigger('spinScale', [
    transition(`${transitionSting ? transitionSting : 'void => *'}`, [
      animate(
        `${speed || 425}ms ${delay || 200}ms`,
        keyframes([
          style({ opacity: 1, transform: 'rotate(0) scale(1)', offset: 0 }),
          style({ opacity: 1, transform: `rotate(${degrees || 360}deg) scale(1)`, offset: 0.4 }),
          style({ opacity: 1, transform: `rotate(${degrees || 360}deg) scale(1.5)`, offset: 0.5 }),
          style({ opacity: 1, transform: `rotate(${degrees || 360}deg) scale(1)`, offset: 1.0 })
        ])
      )
    ])
  ]);
}
