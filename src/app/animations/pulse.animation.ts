import { animate, style, transition, trigger, keyframes, state } from '@angular/animations';

export const pulseAnimation = (
  manualTrigger: 'enter' | 'leave' | 'manual' = 'enter',
  delay: number | [number] = 200,
  speed = 220,
  scale = 1.5
) => {
  if (Array.isArray(delay)) {
    delay = delay[0] + 200;
  }
  let stateTransition: string;
  switch (manualTrigger) {
    case 'enter':
      stateTransition = 'void => *';
      break;
    case 'leave':
      stateTransition = '* => void';
      break;
    case 'manual':
      stateTransition = 'default => rotated';
      break;

    default:
      break;
  }
  return trigger('pulse', [
    transition(stateTransition, [
      animate(
        `${speed}ms ${delay}ms`,
        keyframes([
          style({ opacity: 1, transform: `scale(1)`, offset: 0 }),
          style({ opacity: 0.9, transform: `scale(${scale})`, offset: 0.4 }),
          style({ opacity: 1, transform: `scale(1)`, offset: 1.0 })
        ])
      )
    ])
  ]);
};
