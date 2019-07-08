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
    console.log(this.itemService.getLocal());
  }

  getItem() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.item = this.itemService.getLocalItem(id);
  }

  saveItem(): void {
    this.itemService.saveLocal(this.item);
    this.router.navigate(['/dashboard']);
  }
}
