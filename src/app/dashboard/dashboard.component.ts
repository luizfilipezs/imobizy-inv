import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';

import { Audit } from '../audit';
import { AuditService } from '../audit.service';
import { Router } from '@angular/router';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: Item[] = [];
  audits: Audit[] = [];
  currentAudit: Audit;

  constructor(
    private itemSerice: ItemService,
    private auditService: AuditService,
    private router: Router) { }

  ngOnInit() {
    this.getItems();
    this.getAudits();
    this.getCurrentAudit();
  }

  getItems(): void {
    this.items = this.itemSerice.getLocal();
  }

  getAudits(): void {
    this.audits = this.auditService.getLocal();
  }

  getCurrentAudit(): void {
    let localAuditID: number = JSON.parse(localStorage.getItem('currentAudit'));
    if (localAuditID !== null) {
      let curAudit = this.auditService.getLocal().find(audit => audit.id === localAuditID);
      if (typeof curAudit !== 'undefined') {
        this.currentAudit = curAudit;
      }
    }
  }

  percent(cur1: number, cur2: number, total1?: number): number {
    return (cur2 * (total1 || 100)) / cur1;
  }

  redirectAudit(): void {
    if (this.currentAudit) {
      this.router.navigate(['/scanner', this.currentAudit.id]);
    }
  }
}
