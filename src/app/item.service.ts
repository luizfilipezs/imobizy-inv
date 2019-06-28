import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
import { Observable } from 'rxjs';

import { Item } from './item';

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

  getItems() {
    return this.http.get(this.itemsUrl);
  }
}
