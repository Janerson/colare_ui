import { Tabela } from '../../../shared/entity/colare/tabelas';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import {
  Arquivo,
  ColareRetorno,
} from "../../../shared/entity/colare/colare-retorno";
import { Subscription, EMPTY } from "rxjs";
import { ModalService } from "../../../shared/services/modal.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Validators } from "@angular/forms";
import {
  NgWizardService,
  NgWizardConfig,
  StepChangedArgs,
  TOOLBAR_POSITION,
} from "ng-wizard";
import { LicRetificaService } from '../service/lic-retifica-homolog.service';
import { TABELAS_DOMINIOS } from '../../../shared/enum-layouts/tabelas';
import { TabelaService } from '../../tabelas/service/tabelas.service';

@Component({
  selector: "app-lic-retifica-popup",
  templateUrl: "./lic-retifica-popup.component.html",
  styleUrls: ["./lic-retifica-popup.component.scss"],
})
export class LicRetificaPopupComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  protected dominios: Tabela[];
  data: number;
  private subscriptionDominio: Subscription;

  @ViewChild("file") _file: ElementRef;

  constructor(
    private modalService: ModalService,
    private bsModalRef: BsModalRef,
    protected dominioService: TabelaService,
    protected retificaService: LicRetificaService,
    private ngWizardService: NgWizardService
  ) {
    super();
    this.criaForm();
  }
  ngOnDestroy(): void {
    this.subscriptionDominio.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptionDominio = this.dominioService
      .listaDominio(TABELAS_DOMINIOS.TIPO_DE_RETIFICACAO, true)
      .subscribe((data) => (this.dominios = data));

    this.retificaService
      .getPorIdProcedimentoEStatusEnvio(this.data, "NAO_HOMOLOGADO")
      .subscribe((value) => {
        if (value) {
          this.atualizaFormulario(value);
          this.ngWizardService.next();
          console.log(this.formValue())
        }
      });
      this.atualizaFormulario({ idProcedimentoOuContrato: this.data });
     
  }

  private criaForm() {
    this.formulario.addControl(
      "idProcedimentoOuContrato",
      this.builder.control(null, [Validators.required])
    );
    this.formulario.addControl(
      "codTipoRetificacao",
      this.builder.control(null, [Validators.required])
    );
    this.formulario.addControl(
      "motivoRetificacao",
      this.builder.control(null, [Validators.required])
    );
  }

  /**
   * Submeter os dados do formulári
   */
  submit() {
    this.retificaService
      .transmitirColare(this.formValue())
      .subscribe((data: ColareRetorno) => {
        this.atualizaFormulario(data);
        this.retificaService.salvar(this.formValue()).subscribe(res => {
          this.atualizaFormulario(res)
        });
        this.ngWizardService.next();
        console.log("submit() ",this.formValue())
      });
  }

  obterPdf() {
    this.retificaService.obterPdfHomologacaoColare(
      this.formValue("arquivo.recibo")
    );
    this.ngWizardService.next();
  }

  onFileChange(file: File) {
    if (file) {
      this.homologar(file)    
    }
    this._file.nativeElement.value = null;
  }

  homologar(file: File) {
    this.retificaService
      .homologarEnvioColare(this.formValue(), file)
      .subscribe(() => {
        this.retificaService.getColare(this.formValue())
        .subscribe(retorno =>{
          this.atualizaFormColare(retorno)
          this.retificaService.salvar(this.formValue())
          .subscribe(a => {
            this.modalService.emitChange(true);
           this.cancelar();
          });
        })
      });
  }

  cancelar() {
    this.bsModalRef.hide();
  }

  stepChanged() {}
}
