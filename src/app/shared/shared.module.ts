import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { OnlyNumberDirective } from "./diretivas/only-number.directive";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertModalComponent } from "./ui/alert-modal/alert-modal.component";
import { BaseFormComponent } from "./ui/base-form/base-form.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertService } from "./services/alert.service";
import { FileUploadComponent } from "./ui/file-upload/file-upload.component";
defineLocale("pt-br", ptBrLocale);

@NgModule({
  declarations: [
    OnlyNumberDirective,
    AlertModalComponent,
    BaseFormComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    TypeaheadModule,
    OnlyNumberDirective,
    ReactiveFormsModule,
    BaseFormComponent,
    NgxJsonViewerModule,
    PaginationModule,
    AlertModalComponent,
    FileUploadComponent,
    // BsDatepickerModule
  ],
  providers: [BsLocaleService, BsModalService, AlertService],
  entryComponents: [AlertModalComponent],
})
export class SharedModule {
  constructor(localeService: BsLocaleService) {
    localeService.use("pt-br");
  }
}
