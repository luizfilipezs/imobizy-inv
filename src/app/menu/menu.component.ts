import { Component, OnInit, HostBinding, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-menu',
  animations: [
    trigger('openCloseMenu', [
      state('open', style({
        marginRight: '-75%'
      })),
      state('closed', style({
        marginRight: 0
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('openCloseMask', [
      state('open', style({
        zIndex: -1,
        opacity: 0
      })),
      state('closed', style({
        zIndex: 1,
        opacity: 1
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ])
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() isOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

}
