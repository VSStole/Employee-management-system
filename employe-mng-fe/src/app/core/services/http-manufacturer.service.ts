import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { City, Manufacturer, ManufacturerDTO } from '../models';
import { Page, PageResponse } from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class HttpManufacturerService {
  deleteManufacture(id: number) {
    throw new Error('Method not implemented.');
  }

  endpointPrefix = 'manufacturer';

  constructor(private httpClient: HttpClient) { }

  getByPage(page: Page) {

    const params = new HttpParams()
    .set('page', page.page)
    .set('size', page.size)
    .set('orderBy', page.orderBy)
    .set('order', page.order);

    return this.httpClient.get<PageResponse<Manufacturer>>(`${this.endpointBasePath}/page`, {params});

    //return this.httpClient.get<PageResponse<City>>(`http://localhost:3000/city/page?page=${page.page}&size=${page.size}&orderBy=${page.orderBy}&order=${page.order}`)

  }




  get(id: number) {
    return this.httpClient.get<ManufacturerDTO>(`${this.endpointBasePath}/${id}`);
  }

  post(manufacturer: ManufacturerDTO): Observable<Response> {
    return this.httpClient.post<Response>(`${this.endpointBasePath}`, manufacturer);
  } 

  put(manufacturer: ManufacturerDTO): Observable<Response> {
    return this.httpClient.put<Response>(`${this.endpointBasePath}/${manufacturer.id}`, manufacturer);
  } 


  delete(id: number) {
    return this.httpClient.delete<any>(`${this.endpointBasePath}/${id}`); //, {responseType: 'text' as 'json'});
  }

  get endpointBasePath() {
    return `${environment.serverUrl}/${this.endpointPrefix}`;
  }
}
