import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private itemService: ItemService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getServer()
      .subscribe(data => {
        let items = data['items'];
        let i = items.find((item: Item) => item.id === id);
        if (i >= 0) {
          this.item = items[i];
        } else {
          this.item = new Item();
          this.item.id = id;
          this.itemService.saveLocal(this.item);
        }
      });
  }

  saveItem(): void {
    this.itemService.saveLocal(this.item);
    this.router.navigate(['/dashboard']);
  }
}
