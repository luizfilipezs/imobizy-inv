import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.redirect();
  }

  redirect(): void {
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

}
