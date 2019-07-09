import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.clear();
  }

  redirect() {
    const username = (document.querySelector('#username') as HTMLInputElement).value;
    const user: User = {
      id: 1,
      username: username
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
  }

}
