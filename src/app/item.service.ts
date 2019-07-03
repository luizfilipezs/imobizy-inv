import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item } from './item';
import { Observable } from 'rxjs';

/*
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
*/

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsUrl = 'assets/items.json';

  constructor(private http: HttpClient) { }

  getItemsFromServer() {
    return this.http.get(this.itemsUrl);
  }

  getLocalItems(): Item[] {
    const localDB = localStorage.getItem('items');
    return JSON.parse(localDB) || [];
  }
}
