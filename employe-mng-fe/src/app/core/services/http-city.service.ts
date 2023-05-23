import{HttpClient,HttpHeaders,HttpParams}from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
 import{Page,PageResponse}from'../models/dtos';
import { City } from '../models/domain';
@Injectable({
    providedIn:'root'
})
export class HttpCityService{
    endpointPrefix='city';
    constructor(
      private httpClient:HttpClient,
 
      
      ){}
     getAll(){
            // Authorization header se dodaje u HttpAuth Interceptoru
    // const token = btoa('admin:admin123');
    // console.log(token);
    // const headers = new HttpHeaders().set('Authorization','Basic '+ token );

    return this.httpClient.get<City[]>(`${this.endpointBasePath}`);

     }


     getByPage(page:Page){
        const params = new HttpParams()
        .set('page',page.page)
        .set('size',page.size)
        .set('orderBy',page.orderBy)
        .set('order',page.order);
        return this.httpClient.get<PageResponse<City>>(`${this.endpointBasePath}/page`,{params});
     }

     deleteCity(zipCode: number) {
        return this.httpClient.delete<any>(`${this.endpointBasePath}/${zipCode}`); //, {responseType: 'text' as 'json'});
      }
    
    
      getCity(zipCode: number) {
        return this.httpClient.get<City>(`${this.endpointBasePath}/${zipCode}`);
      }
    
      insertCity(city: City) {
        return this.httpClient.post<any>(`${this.endpointBasePath}`, city);
      }
    
      updateCity(oldZipCode: number, city: City) {
        return this.httpClient.put<any>(`${this.endpointBasePath}/${oldZipCode}`, city);
      }
    
      get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
      }
}