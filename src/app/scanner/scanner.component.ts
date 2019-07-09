import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuditService } from '../audit.service';
import { openQRCamera } from './scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  constructor(
    private auditService: AuditService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    (document.querySelector('#input') as HTMLElement).onchange = function() {
      openQRCamera(this);
    }
  }

  redirect(): void {
    const itemID = 1; // Here we get id from the scanner
    const auditID = +this.route.snapshot.paramMap.get('auditID');
    if (auditID) {
      this.auditService.addItem(auditID, itemID);
      this.router.navigate(['/confirm']);
    } else {
      this.router.navigate(['/details', itemID]);
    }
  }
}
