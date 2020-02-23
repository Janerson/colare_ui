import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionMenuComponent } from "./ui/action-menu/action-menu.component";
import { RouterModule } from "@angular/router";
import { OnlyNumberDirective } from "./diretivas/only-number.directive";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { TypeaheadModule, BsLocaleService, BsModalService } from "ngx-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertModalComponent } from "./ui/alert-modal/alert-modal.component";
import { BaseFormComponent } from "./ui/base-form/base-form.component";
import { PaginationModule } from 'ngx-bootstrap';
defineLocale("pt-br", ptBrLocale);

@NgModule({
  declarations: [
    ActionMenuComponent,
    OnlyNumberDirective,
    AlertModalComponent,
    BaseFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    PaginationModule.forRoot()
  ],
  exports: [
    TypeaheadModule,
    ActionMenuComponent,
    OnlyNumberDirective,
    ReactiveFormsModule,
    BaseFormComponent,
    NgxJsonViewerModule,
    PaginationModule
    // BsDatepickerModule
  ],
  providers:[BsLocaleService],
})
export class SharedModule {
  constructor(localeService: BsLocaleService) {
    localeService.use("pt-br");
  }
}
