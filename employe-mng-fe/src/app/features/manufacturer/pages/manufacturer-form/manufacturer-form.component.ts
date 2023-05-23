import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, take } from 'rxjs';
import { City, Manufacturer } from 'src/app/core/models';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { HttpManufacturerService } from 'src/app/core/services/http-manufacturer.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.css'],
})
export class ManufacturerFormComponent implements OnInit {
  cities$?: Observable<City[]>;
  manufacturerForm?: FormGroup;

  constructor(
    private httpCity: HttpCityService,
    private httpManufacturer: HttpManufacturerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,            
    private translateService: TranslateService
  ) {
    const manufacturer = this.activatedRoute.snapshot.data['manufacturer'];
    this.buildForm(manufacturer);
  }

  ngOnInit(): void {
    this.loadCities();
  }
  
  buildForm(manufacturer?: Manufacturer) {
    this.manufacturerForm = this.fb.group({
      id: [manufacturer?.id],
      company_number: [manufacturer?.company_number],
      name: [
        manufacturer?.name,
        [Validators.required, Validators.minLength(3)],
      ],
      tax_number: [manufacturer?.tax_number, Validators.required],
      city: [manufacturer?.city],
    });
  }

  loadCities() {
    this.cities$ = this.httpCity.getAll();
  }

  saveManufacturer() {
    const manufacturer = this.manufacturerForm?.getRawValue();
    if (!manufacturer.id) {
      return this.httpManufacturer.post(manufacturer);
    } else {
      return this.httpManufacturer.put(manufacturer);
    }
  }

  onSave() {
    this.saveManufacturer()
      .pipe(take(1))
      .subscribe((message: any) => {
        this.toastService.showToast({
          header: this.translateService.instant('MANUFACTURER.SAVING_MANUFACTURER_HEADER'),
          message: this.translateService.instant('MANUFACTURER.SAVING_MANUFACTURER_MESSAGE'),
          classNames: 'bg-success',
        });
        this.router.navigate(['/manufacturer/manufacturer-list'], {
          queryParamsHandling: 'preserve',
        });
      });
  }
}
