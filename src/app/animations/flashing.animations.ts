import { animate, state, style, transition, trigger } from '@angular/animations';

export const flashingAnimation = (speed = 400) => {
  return trigger('flashing', [
    state('bright', style({ background: 'hsl(87.8,50.2%,62.7%)' })),
    state('dark', style({ background: 'hsl(87.8,50.2%,52.7%)' })),
    transition('bright <=> dark', [animate(speed)])
  ]);
};
