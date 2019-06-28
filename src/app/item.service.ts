import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsUrl = 'assets/items.json';

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(this.itemsUrl);
  }
}
