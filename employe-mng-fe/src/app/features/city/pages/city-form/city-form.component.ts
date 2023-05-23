import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, takeUntil, zip } from 'rxjs';
import { City } from 'src/app/core/models/domain';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit, OnDestroy {

  city?: City;
  cityForm?: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(private activeRoute: ActivatedRoute,
              private fb: FormBuilder,
              private httpCity: HttpCityService,
              private toastService: ToastService,
              private router: Router,
              private translateService: TranslateService) {
              //  Taking data added in Resolver (look for city-routing.module.ts)
    this.city = this.activeRoute.snapshot.data['city'];

    this.destroy$.subscribe( value => console.log('Value from destroy ', value, new Date()))
   }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
      this.destroy$.next(true)
  }

  buildForm() {
    this.cityForm = this.fb.group({
      zip_code: [this.city?.zip_code, Validators.required],
      name: [this.city?.name, Validators.required]
    })
  }


  saveCity(city: City, zip_code?:number) {
    if (this.city && zip_code) {
      return this.httpCity.updateCity(zip_code , city);
    } else {
      return this.httpCity.insertCity(city);
    }
  }

  onSave() {
    if (!this.cityForm) return;

    this.saveCity(this.cityForm.value, this.city?.zip_code)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
          (message: any) => {
            this.toastService.showToast(
              {
                header: this.translateService.instant('CITY.SAVING_CITY_HEADER'),
                message:this.translateService.instant('CITY.SAVING_CITY_MESSAGE'),
                classNames:'bg-success' }
              );
            this.router.navigate(['/city/city-list'], { queryParamsHandling:'preserve' });
          }
    );

    // if (this.city) {
    //   this.httpCity.updateCity(this.city.zip_code , this.cityForm.value).subscribe(
    //     (message: any) => {
    //       this.toastService.showToast({header: 'Saving city', message:'City updated successfully', classNames:'bg-success' });
    //       this.router.navigate(['/city/city-list']);
    //     }
    //   );
    // } else {
    //   this.httpCity.insertCity(this.cityForm.value).subscribe(
    //     (message: any) => {
    //       this.toastService.showToast({header: 'Saving city', message:'City inserted successfully', classNames:'bg-success' });
    //       this.router.navigate(['/city/city-list']);
    //     }
    //   );
    // }

  }

}
