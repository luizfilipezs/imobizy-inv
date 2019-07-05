import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScannerComponent } from './scanner/scanner.component';
import { DetailsComponent } from './details/details.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'Login' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { animation: 'Dashboard' }
  },
  {
    path: 'scanner/:type',
    component: ScannerComponent,
    data: { animation: 'Scanner' }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { animation: 'Details' }
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    data: { animation: 'Confirm' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
