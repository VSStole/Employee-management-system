import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ManufacturerDTO } from 'src/app/core/models';
import { HttpManufacturerService } from 'src/app/core/services/http-manufacturer.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerResolver implements Resolve<ManufacturerDTO> {

  constructor(private httpManufacturer: HttpManufacturerService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ManufacturerDTO> {
    const id = Number(route.paramMap.get('id'));    
    return this.httpManufacturer.get(id);
  }
}
