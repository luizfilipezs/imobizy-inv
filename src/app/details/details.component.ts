import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { generateID } from '../utilities';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item = new Item(generateID(this.itemService.getLocal()));

  constructor(
    private itemService: ItemService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  saveItem(): void {
    this.itemService.saveLocal(this.item);
    this.router.navigate(['/dashboard']);
  }
}
