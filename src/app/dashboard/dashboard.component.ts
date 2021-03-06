import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { Audit } from '../audit';
import { AuditService } from '../audit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: Item[] = [];
  audits: Audit[] = [];
  currentAudit: Audit;
  listIsOpen = true;

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
    const localAuditID: number = JSON.parse(localStorage.getItem('currentAudit'));
    if (localAuditID !== null) {
      const curAudit = this.auditService.getLocalAudit(localAuditID);
      if (typeof curAudit !== 'undefined') {
        this.currentAudit = curAudit;
      }
    }
  }

  selectAudit(id: number): void {
    localStorage.setItem('currentAudit', JSON.stringify(id));
    this.getCurrentAudit();
    this.toggleAuditsList();
  }

  toggleAuditsList(): void {
    this.listIsOpen = !this.listIsOpen;
    let box = document.querySelector('.audits-list-box') as HTMLElement;
    box.style.zIndex = this.listIsOpen ? '-2' : '2';
  }

  redirectAudit(): void {
    if (this.currentAudit) {
      this.router.navigate(['/scanner', this.currentAudit.id]);
    }
  }

  percent(cur1: number, cur2: number, total1?: number): number {
    const calc = (cur2 * (total1 || 100)) / (cur1 || 1);
    return calc !== NaN ? calc : 0;
  }

  createDocument(): void {
    const audit = this.auditService.createAudit();
    this.selectAudit(audit.id);
    this.getAudits();
  }
}
