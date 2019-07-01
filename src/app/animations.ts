import {
  trigger,
  style,
  animate,
  transition,
  query,
  group,
  animateChild
} from '@angular/animations';

export const fadeInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 1
        })
      ]),
      query(':enter', [
        style({ opacity: 0})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ opacity: 0}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);