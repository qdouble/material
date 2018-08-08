import { animate, style, transition, trigger, keyframes } from '@angular/animations';

export const pulseAnimation = (
  transitionSting: string = 'void => *',
  delay: number,
  speed: number,
  scale: number
) => {
  return trigger('pulse', [
    transition(`${transitionSting ? transitionSting : 'void => *'}`, [
      animate(
        `${speed || 220}ms ${delay || 200}ms`,
        keyframes([
          style({ opacity: 1, transform: `scale(1)`, offset: 0 }),
          style({ opacity: 0.9, transform: `scale(${scale || 1.5})`, offset: 0.4 }),
          style({ opacity: 1, transform: `scale(1)`, offset: 1.0 })
        ])
      )
    ])
  ]);
};
