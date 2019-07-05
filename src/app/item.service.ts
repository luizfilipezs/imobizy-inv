import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { handleError } from './handleError';
import { catchError } from 'rxjs/operators'; 

import { Item } from './item';

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

  getItemsFromServer() {
    return this.http.get(this.itemsUrl);
  }

  getLocalItems(): Item[] {
    const localDB = localStorage.getItem('items');
    return JSON.parse(localDB) || [];
  }

  saveLocalItem(item: Item): void {
    let local = this.getLocalItems();
    const i = local.findIndex(localItem => localItem.id === item.id);
    if (i >= 0) {
      local[i] = item;
    } else {
      local.push(item);
    }
    localStorage.setItem('items', JSON.stringify(local));
  }

  saveServerItems(items: Item[]): Observable<Item[]> {
    return this.http.post<Item[]>(this.itemsUrl, items, httpOptions)
      .pipe(
        catchError(handleError)
      );
  }

  syncData() {
    this.getItemsFromServer()
      .subscribe(data => {
        function updateList(currentList: Item[], listToUpdate: Item[]): Item[] {
          for (let item of currentList) {
            let exists = listToUpdate.find(toUpItem => toUpItem.id === item.id);
            if (!exists) {
              listToUpdate.push(item);
            }
          }
          return listToUpdate;
        }
        const local = updateList(data['items'], this.getLocalItems());
        const server = updateList(this.getLocalItems(), data['items']);
        // Update local database
        localStorage.setItem('items', JSON.stringify(local));
        // Update server database
        this.saveServerItems(server);
      });
  }
}
