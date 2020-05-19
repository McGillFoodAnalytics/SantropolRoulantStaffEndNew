import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slide', [
      state('first', style({ transform: 'translateX(0)' })),
      state('second', style({ transform: 'translateX(-33.33%)' })),
      state('third', style({ transform: 'translateX(-66.666%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class SliderComponent {
  @Input() activePane: PaneType = 'third';
}

type PaneType = 'first' | 'second' | 'third';
