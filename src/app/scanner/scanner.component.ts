import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  redirect(): void {
    const operationType = this.route.snapshot.paramMap.get('type');
    if (operationType === 'register') {
      this.router.navigate(['/details', '1']);
    } else {
      this.router.navigate(['/confirm']);
    }
  }

}
