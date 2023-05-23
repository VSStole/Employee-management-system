import { Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City, Manufacturer } from 'src/app/core/models';
import { Observable, Subscription } from 'rxjs';
 import { ToastService } from 'src/app/core/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmOptions } from 'src/app/core/models/enums';
import { Page } from 'src/app/core/models/dtos';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { HttpManufacturerService } from 'src/app/core/services/http-manufacturer.service';
  // import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit,OnDestroy {

selectedManufacturer?:Manufacturer;
subscriptions = new Subscription();
manufacturers?: Manufacturer[];



  cityMap: Map<number, City> = new Map();
  //////////////////////////////////////////////
  currentPage: Page = {page: 1, size: 5, orderBy:'name', order: 'ASC', totalItems: 10 };
  availablePageSizes = [3, 5, 10, 15, 20 ,25];

  // @ViewChildren(SortableHeaderDirective)
  // sortableHeaders?: QueryList<SortableHeaderDirective>;
  allManufacturers$?: Observable<Manufacturer[]>;

  constructor(
    private httpCity: HttpCityService, 
    private httpManufacturer: HttpManufacturerService,
     private activatedRoute: ActivatedRoute,
     private modalService: NgbModal,
     private toastService: ToastService,

      ) { }

  ngOnInit(): void {    
    this.loadPageFromQueryParams();
    this.loadCities();
    this.loadManufacturers();
  }

  loadPageFromQueryParams() {
    const page = Number(this.activatedRoute.snapshot.queryParams['page']);
    if (page) { this.currentPage.page = page;}

    const size = Number(this.activatedRoute.snapshot.queryParams['size']);
    if (size) { this.currentPage.size = size;}

    const orderBy = this.activatedRoute.snapshot.queryParams['orderBy'];
    if (orderBy) { this.currentPage.orderBy = orderBy;}

    const order = this.activatedRoute.snapshot.queryParams['order'];
    if (order) { this.currentPage.order = order;}
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
}


  loadCities() {
    this.httpCity.getAll().subscribe(
      cities => cities.forEach( city => this.cityMap.set(city.zip_code, city))
    )
  }

  loadManufacturers() {
    this.httpManufacturer.getByPage(this.currentPage).subscribe(
      manufacturersPage => {
        this.manufacturers = manufacturersPage.content;
        this.currentPage.page = manufacturersPage.page;
        this.currentPage.totalItems = manufacturersPage.totalItems;
      }
    )
  }

  onDetailsClick(manufacturer: Manufacturer, manufacturerDetailsTemplate: TemplateRef<any> ) {
    this.selectedManufacturer = manufacturer;
    this.modalService.open(manufacturerDetailsTemplate);
  }

  onDeleteClick(manufacturer:Manufacturer) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.header = 'Deleting manufacturer';
    modalRef.componentInstance.message = `Are you sure that you want to delete manufacturer ${manufacturer.name} ?`;
    modalRef.result.then(
      result => (result ===ConfirmOptions.YES) && (this.deleteManufacturer(manufacturer))
    );
  }

  deleteManufacturer(manufacturer: Manufacturer) {
    const subscription  = this.httpManufacturer.delete(manufacturer.id).subscribe(
     {
      next: (response) => {
        this.toastService.showToast({header: 'Deliting manufacturer', message: 'Manufacturer deleted', delay: 2000, classNames:'bg-success'});
        this.loadManufacturerByPage();
      },
      error: error => {
        this.toastService.showToast({header: 'Deliting manufacturer', message: 'Manufacturer was not deleted', delay: 2000, classNames:'bg-danger'})
      }
     }
    );

    this.subscriptions.add(subscription);
  }
  loadManufacturerByPage() {
    throw new Error('Method not implemented.');
  }



  // onSort(sortEvent: SortEvent) {
  //   console.log('sort event:', sortEvent);

  //   this.sortableHeaders?.forEach(
  //     sortableHeader =>  {
  //      if (sortableHeader.sortable !== sortEvent.columnName) {
  //       sortableHeader.direction = '';
  //      }
  //     }
  //   );
  //   this.currentPage = {page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName , order: sortEvent.direction, totalItems: 0};
  //   this.loadManufacturers();
  // }

}
