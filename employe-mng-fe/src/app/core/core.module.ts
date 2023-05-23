import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';
import { HttpErrorMessageInterceptor } from './interceptors/http-error-message.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true},
     {provide: HTTP_INTERCEPTORS, useClass: HttpErrorMessageInterceptor, multi: true}
  ]
})
export class CoreModule { }
