import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
  const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'home', component: HomeComponent},
 
   {path: 'manufacturer',
  loadChildren: () => import('./features/manufacturer/manufacturer.module').then(m => m.ManufacturerModule)
  },
 
   {path: 'city',
  loadChildren: () => import('./features/city/city. module').then(m => m.CityModule)
},



   {path:'', pathMatch:'full', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

