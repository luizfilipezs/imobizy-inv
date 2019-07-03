import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item: Item;

  constructor(
    private route: ActivatedRoute, 
    private service: ItemService
    ) { }

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getItemsFromServer()
      .subscribe(data => this.item = data['items'].find((item: Item) => item.id === id));
  }

}
