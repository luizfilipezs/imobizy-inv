import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

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
    let idx = local.findIndex(localItem => localItem.id === item.id);
    if (idx >= 0) {
      local[idx] = item;
    } else {
      local.push(item);
    }
    localStorage.setItem('items', JSON.stringify(local));
  }

  saveServerItems(items: Item[]): Observable<Item[]> {
    return this.http.post<Item[]>(this.itemsUrl, items, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  syncData() {
    this.getItemsFromServer()
      .subscribe(data => {
        let local = this.getLocalItems();
        let server = data['items'];
        for (let item of server) {
          let exists = local.find(localItem => localItem.id === item.id);
          if (!exists) {
            local.push(item);
          }
        }
        let newServerItems: Item[] = [];
        for (let item of local) {
          let exists = server.find(serverItem => serverItem.id === item.id);
          if (!exists) {
            newServerItems.push(item);
          }
        }
        // Update local database
        localStorage.setItem('items', JSON.stringify(local));
        // Update server database
        this.saveServerItems(newServerItems);
      });
  }
}
