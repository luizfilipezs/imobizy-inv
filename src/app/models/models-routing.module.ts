import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelsCenterComponent } from './models-center/models-center.component';
import { ModelDetailsComponent } from './model-details/model-details.component';

const routes: Routes = [
  {
    path: 'models',
    component: ModelsCenterComponent
  },
  {
    path: 'editModel',
    component: ModelDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
