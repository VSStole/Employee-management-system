import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerFormComponent } from './pages/manufacturer-form/manufacturer-form.component';
import { ManufacturerListComponent } from './pages/manufacturer-list/manufacturer-list.component';
import { ManufacturerResolver } from './resolvers/manufacturer.resolver';

const routes: Routes = [
  {path: 'manufacturer-list', component: ManufacturerListComponent},
  {path: 'manufacturer-form', component: ManufacturerFormComponent},
  {path: 'manufacturer-form/:id', component: ManufacturerFormComponent, resolve: {manufacturer: ManufacturerResolver} } ,
  {path: '', pathMatch:'full', redirectTo:'manufacturer-list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule { }
