import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { handleError } from './handleError';
import { catchError } from 'rxjs/operators';

import { Audit, AuditedItem } from './audit';
import { generateID, insertZero } from './utilities';

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

  auditsUrl = 'api/audits';

  constructor(private http: HttpClient) { }

  // local operations

  createAudit(): Audit {
    const id = generateID(this.getLocal()),
      documentsNumber = insertZero(this.getLocal().length + 1),
      date = new Date(),
      docNum = (date.getFullYear() + insertZero(date.getMonth() + 1) + insertZero(date.getDate()) + documentsNumber).toString(),
      audit = new Audit(id, docNum);
    this.saveLocal(audit);
    return audit;
  }

  getLocal(): Audit[] {
    return JSON.parse(localStorage.getItem('audits')) || [];
  }

  getLocalAudit(id: number): Audit {
    return this.getLocal().find(audit => audit.id === id);
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

  addItem(auditID: number, itemID: number) {
    const AUDIT = this.getLocal().find(audit => audit.id === auditID);
    if (typeof AUDIT !== 'undefined') {
      const itemIndex = AUDIT.itens.findIndex(item => item.id === itemID);
      if (itemIndex < 0) {
        AUDIT.itens.push(new AuditedItem(itemID));
      }
    }
    this.saveLocal(AUDIT);
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
