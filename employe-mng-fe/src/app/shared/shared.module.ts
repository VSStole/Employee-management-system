import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalToastComponent } from './components/global-toast/global-toast.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './components/header/header.component';
// import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { TranslateModule } from '@ngx-translate/core';
import { BootstrapIconsPickModule } from "./bootstrap-icons/bootstrap-icons-pick.module";
import { RouterModule } from "@angular/router";



@NgModule({
    declarations: [
        GlobalToastComponent,
        ConfirmDialogComponent,
        HeaderComponent,
        // SortableHeaderDirective

    ],
    imports: [
        CommonModule,
        NgbToastModule,
        NgbDropdownModule,
        NgbPaginationModule,
        NgbNavModule,
        NgbModalModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        BootstrapIconsPickModule,
        RouterModule
    ],
    exports: [
        NgbToastModule,
        NgbDropdownModule,
        NgbPaginationModule,
        NgbNavModule,
        GlobalToastComponent,
        TranslateModule,
        BootstrapIconsPickModule,
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HeaderComponent

    ] 

})
export class SharedModule { }
