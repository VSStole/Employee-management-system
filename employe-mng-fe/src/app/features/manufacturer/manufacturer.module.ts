import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManufacturerListComponent } from './pages/manufacturer-list/manufacturer-list.component';
import { ManufacturerFormComponent } from './pages/manufacturer-form/manufacturer-form.component';


@NgModule({
  declarations: [
    ManufacturerListComponent,
    ManufacturerFormComponent
  ],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
    SharedModule
  ]
})
export class ManufacturerModule { }
