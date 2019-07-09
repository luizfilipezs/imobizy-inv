import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { handleError } from './handleError';
import { catchError } from 'rxjs/operators'; 

import { Item } from './item';
import { generateID } from './utilities';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsUrl = 'assets/items.json';

  constructor(private http: HttpClient) { }

  // local operations

  getLocal(): Item[] {
    return JSON.parse(localStorage.getItem('items')) || [];
  }

  getLocalItem(id: number) {
    let item = this.getLocal().find(item => item.id === id);
    if (typeof item === 'undefined') {
      let newItem = new Item(generateID(this.getLocal()));
      newItem.id = id;
      this.saveLocal(newItem);
      return newItem;
    }
    return item;
  }

  saveLocal(item: Item): void {
    let local = this.getLocal();
    const i = local.findIndex(localItem => localItem.id === item.id);
    if (i >= 0) {
      local[i] = item;
    } else {
      local.push(item);
    }
    localStorage.setItem('items', JSON.stringify(local));
  }

  deleteLocal(id: number) {
    let local = this.getLocal();
    const i = local.findIndex(item => item.id === id);
    if (i >= 0) {
      local.splice(i, 1);
    }
    localStorage.setItem('items', JSON.stringify(local));
  }

  // server operations

  getServer() {
    return this.http.get(this.itemsUrl);
  }

  postServer(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions)
      .pipe(
        catchError(handleError)
      );
  }

  putServer(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemsUrl, item, httpOptions)
      .pipe(
        catchError(handleError)
      );
  }

  syncItems() {
    this.getServer()
      .subscribe(data => {
        let local = this.getLocal();
        const server: Item[] = data['items'];

        server.forEach(serverItem => {
          let i = local.findIndex(localItem => localItem.id === serverItem.id);
          if (i >= 0) {
            if (serverItem !== local[i]) {
              let compare = new Date(serverItem.ultimaAlteracao) < new Date(local[i].ultimaAlteracao);
              if (compare) {
                local[i] = serverItem;
              } else {
                this.putServer(local[i]);
              }
            }
          } else {
            local.push(serverItem);
          }
        });
        local.forEach(localItem => {
          let i = server.findIndex(serverItem => serverItem.id === localItem.id);
          if (i < 0) {
            this.postServer(localItem);
          }
        });

        localStorage.setItem('items', JSON.stringify(local));
      });
  }
}
