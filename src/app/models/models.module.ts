import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsCenterComponent } from './models-center/models-center.component';
import { ModelDetailsComponent } from './model-details/model-details.component';

@NgModule({
  declarations: [
    ModelsCenterComponent, 
    ModelDetailsComponent
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ModelsModule { }
