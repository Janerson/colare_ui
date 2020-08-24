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
// import filepond module
import { FilePondModule, registerPlugin } from "ngx-filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { FileUploadPondComponent } from "./ui/file-upload-pond/file-upload-pond.component";
import { Erro412Component } from "./ui/erro412/erro412.component";
import { BaseModalComponent } from "./ui/base-modal/base-modal.component";
import { PassaporteComponent } from "./ui/passaporte/passaporte.component";
import { EnvioComponent } from "./ui/envio/envio.component";
import { AcoesComponent } from "./ui/acoes/acoes.component";
import { StatusEnvioPipe } from "./pipes/status-envio.pipe";
import { ValidatorComponentComponent } from "./ui/validator-component/validator-component.component";
import { CardComponent } from "./ui/card/card.component";
import { CustomAlertComponent } from "./ui/custom-alert/custom-alert.component";
import { PopoverModule } from "ngx-bootstrap/popover";
import {
  NgWizardModule,
  NgWizardConfig,
  THEME,
  TOOLBAR_POSITION,
} from "ng-wizard";
import { AlertModule } from "ngx-bootstrap/alert";
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);
//registerPlugin(FilePondPluginGetFile)

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

@NgModule({
  declarations: [
    OnlyNumberDirective,
    AlertModalComponent,
    BaseFormComponent,
    FileUploadComponent,
    FileUploadPondComponent,
    BaseModalComponent,
    PassaporteComponent,
    EnvioComponent,
    Erro412Component,
    AcoesComponent,
    StatusEnvioPipe,
    ValidatorComponentComponent,
    CardComponent,
    CustomAlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    NgWizardModule.forRoot(ngWizardConfig),
    FilePondModule,
  ],
  exports: [
    NgWizardModule,
    TypeaheadModule,
    OnlyNumberDirective,
    ReactiveFormsModule,
    BaseFormComponent,
    NgxJsonViewerModule,
    PaginationModule,
    AlertModalComponent,
    AlertModule,
    CustomAlertComponent,
    FileUploadComponent,
    FileUploadPondComponent,
    BaseModalComponent,
    Erro412Component,
    AcoesComponent,
    PopoverModule,
    StatusEnvioPipe,
    ValidatorComponentComponent,
    CardComponent,
    // BsDatepickerModule
  ],
  providers: [BsLocaleService, BsModalService, AlertService],
  //entryComponents: [AlertModalComponent,BaseModalComponent,PassaporteComponent],
})
export class SharedModule {
  constructor(localeService: BsLocaleService) {
    localeService.use("pt-br");
  }
}
