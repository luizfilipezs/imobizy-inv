import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { handleError } from './handleError';
import { catchError, audit } from 'rxjs/operators';

import { Audit } from './audit';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuditingService {

  auditsUrl = 'assets/audits.json';

  constructor(private http: HttpClient) { }

  // local operations

  getLocal(): Audit[] {
    return JSON.parse(localStorage.getItem('audits')) || [];
  }

  saveLocal(audit: Audit): void {
    let localDB: Audit[] = JSON.parse(localStorage.getItem('audits')) || [];
    localDB.push(audit);
    localStorage.setItem('audits', JSON.stringify(localDB));
  }

  // server operations

  getServer() {
    return this.http.get(this.auditsUrl);
  }

  postServer(audit: Audit): Observable<Audit> {
    return this.http.post<Audit>(this.auditsUrl, audit, httpOptions)
      .pipe(
        catchError(handleError)
      );
  }

  putServer(audit: Audit): Observable<Audit> {
    return this.http.put<Audit>(this.auditsUrl, audit, httpOptions)
      .pipe(
        catchError(handleError)
      );
  }

  // sync local and server database

  syncAudits() {
    this.getServer()
      .subscribe(data => {
        const local = this.getLocal();
        let server: Audit[] = data['audits'];
        
        local.forEach(localItem => {
          let i = server.findIndex(serverItem => serverItem.id === localItem.id);
          if (i >= 0) {
            if (server[i] !== localItem) {
              this.putServer(localItem);
            }
          } else {
            this.postServer(localItem);
          }
        });
      });
  }
}
