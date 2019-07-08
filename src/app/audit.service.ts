import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { handleError } from './handleError';
import { catchError } from 'rxjs/operators';

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
export class AuditService {

  auditsUrl = 'assets/audits.json';

  constructor(private http: HttpClient) { }

  generateID(): number {
    let i = 0;
    let id: number;
    while (i >= 0) {
      id = Math.floor(Math.random() * 99999999999);
      i = this.getLocal().findIndex(item => item.id === id);
    }
    return id;
  }

  // local operations

  getLocal(): Audit[] {
    return JSON.parse(localStorage.getItem('audits')) || [];
  }

  saveLocal(audit: Audit): void {
    let localDB = this.getLocal();
    const i = localDB.findIndex(localAudit => localAudit.id === audit.id);
    if (i >= 0) {
      localDB[i] = audit;
    } else {
      localDB.push(audit);
    }
    localStorage.setItem('audits', JSON.stringify(localDB));
  }

  deleteLocal(id: number): void {
    let local = this.getLocal();
    const i = local.findIndex(audit => audit.id === id);
    if (i >= 0) {
      local.splice(i, 1);
    }
    localStorage.setItem('audits', JSON.stringify(local));
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
