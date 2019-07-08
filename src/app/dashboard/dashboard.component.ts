import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: Item[] = [];

  constructor(private itemSerice: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.items = this.itemSerice.getLocal();
  }

}
