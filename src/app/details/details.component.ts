import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { Severity } from '../message';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item: Item;

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const localItem = this.itemService.getLocalItem(id);
    this.item = localItem instanceof Item ? localItem : new Item(id);
  }

  saveItem(): void {
    let complete = true;
    for (let i in this.item) {
      if (this.item[i] === '' || this.item[i] === null) {
        complete = false;
        break;
      }
    }
    if (complete) {
      this.item.ultimaAlteracao = new Date();
      this.itemService.saveLocal(this.item);
      this.router.navigate(['/dashboard']);
    } else {
      this.messageService.add({
        severity: Severity.Warning,
        body: 'Preencha todos os campos!'
      });
    }
  }
}
