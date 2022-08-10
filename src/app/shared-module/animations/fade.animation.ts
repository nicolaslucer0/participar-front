import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
} from '@angular/animations';

export const fader =
    trigger('routeAnimations', [
        transition('* <=> *', [
            // Set a default  style for enter and leave
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    opacity: 0,
                    transform: 'scale(.8) translateY(10%)',
                }),
            ],
            { optional: true }),
            // Animate the new page in
            query(':enter', [
                animate('.3s ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
            ],
            { optional: true })
        ]),
    ]);
