import { HighlightPipe } from './pipes/highlight.pipe';
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { OnlyNumberDirective } from "./diretivas/only-number.directive";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { BsDatepickerModule, BsLocaleService } from "ngx-bootstrap/datepicker";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AlertModalComponent } from "./ui/alert-modal/alert-modal.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertService } from "./services/alert.service";
import { FileUploadComponent } from "./ui/file-upload/file-upload.component";
// import filepond module

// import and register filepond file type validation plugin
import { FileUploadPondComponent } from "./ui/file-upload-pond/file-upload-pond.component";
import { Erro412Component } from "./ui/erro412/erro412.component";
import { BaseModalComponent } from "./ui/base-modal/base-modal.component";
import { PassaporteComponent } from "./ui/passaporte/passaporte.component";
import { EnvioComponent } from "./ui/envio/envio.component";
import { StatusEnvioPipe } from "./pipes/status-envio.pipe";
import { ValidatorComponentComponent } from "./ui/validator-component/validator-component.component";
import { CardComponent } from "./ui/card/card.component";
import { CustomAlertComponent } from "./ui/custom-alert/custom-alert.component";
import { PopoverModule } from "ngx-bootstrap/popover";
import { IconPickerModule } from "ngx-icon-picker";
import {
  NgWizardModule,
  NgWizardConfig,
  THEME,
  TOOLBAR_POSITION,
} from "ng-wizard";
import { AlertModule } from "ngx-bootstrap/alert";

import { setTheme } from "ngx-bootstrap/utils";
import { DatepickerComponent } from "./ui/date-picker/date-picker.component";
import { CustomSelectComponent } from "./ui/custom-select/custom-select.component";
//import { NgxMaskModule } from 'ngx-mask';
import { CustomCardComponent } from "./ui/custom-card/custom-card.component";
import { TabsModule } from "ngx-bootstrap/tabs";
import { CustomFieldComponent } from "./ui/custom-field/custom-field.component";
import { ColareLayoutTableComponet } from "./ui/colare-table-acoes/colare-table-acoes.component";
import { ColareLayoutAcoesComponent } from "./ui/colare-acoes/colare-acoes.component";
import { TableAcoesComponent } from "./ui/table-acoes/table-acoes.component";
import { ToastrModule } from "ngx-toastr";

defineLocale("pt-br", ptBrLocale);

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default,
  selected: 0,
  keyNavigation: true,
  toolbarSettings: {
    toolbarPosition: TOOLBAR_POSITION.none,
    showPreviousButton: false,
    showNextButton: false,
  },
  anchorSettings: {
    anchorClickable: true,
  },
};
setTheme("bs4");

@NgModule({
  declarations: [
    OnlyNumberDirective,
    AlertModalComponent,
    //BaseFormComponent,
    FileUploadComponent,
    FileUploadPondComponent,
    BaseModalComponent,
    PassaporteComponent,
    EnvioComponent,
    Erro412Component,
    ColareLayoutAcoesComponent,
    StatusEnvioPipe,
    HighlightPipe,
    ValidatorComponentComponent,
    CardComponent,
    CustomAlertComponent,
    ColareLayoutTableComponet,
    DatepickerComponent,
    CustomSelectComponent,
    CustomCardComponent,
    CustomFieldComponent,
    TableAcoesComponent,
  ],
  imports: [
    CommonModule,
    // NgxMaskModule.forRoot(),
    TypeaheadModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxJsonViewerModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    NgWizardModule.forRoot(ngWizardConfig),
    IconPickerModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true,
    }),
  ],
  exports: [
    //  NgxMaskModule,
    NgWizardModule,
    TypeaheadModule,
    OnlyNumberDirective,
    ReactiveFormsModule,
    //BaseFormComponent,
    NgxJsonViewerModule,
    PaginationModule,
    BsDatepickerModule,
    AlertModalComponent,
    AlertModule,
    CustomAlertComponent,
    FileUploadComponent,
    FileUploadPondComponent,
    BaseModalComponent,
    Erro412Component,
    ColareLayoutAcoesComponent,
    PopoverModule,
    StatusEnvioPipe,
    HighlightPipe,
    ValidatorComponentComponent,
    CardComponent,
    IconPickerModule,
    ColareLayoutTableComponet,
    DatepickerComponent,
    CustomSelectComponent,
    CustomCardComponent,
    CustomFieldComponent,
    TabsModule,
    TableAcoesComponent,
    // BsDatepickerModule
  ],
  providers: [BsLocaleService, AlertService, DatePipe],
  //entryComponents: [AlertModalComponent,BaseModalComponent,PassaporteComponent],
})
export class SharedModule {
  constructor(localeService: BsLocaleService) {
    localeService.use("pt-br");
  }
}
