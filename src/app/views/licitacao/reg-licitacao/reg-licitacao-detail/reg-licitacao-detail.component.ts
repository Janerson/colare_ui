import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
} from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription, EMPTY } from "rxjs";

import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { SharedService } from "../../../../shared/services/shared-service.service";
import { AlertService } from "../../../../shared/services/alert.service";
import { RegLicitacaoService } from "../../service/reg-licitacao.service";
import { DominioService } from "../../../dominio/service/dominio.service";
import { Dominios } from "../../../../shared/entity/colare/dominio";
import { TABELAS_DOMINIOS } from "../../../../shared/tabelas";
import { ModalService } from "../../../../shared/services/modal.service";
import { ColareRetorno } from "../../../../shared/entity/colare/colare-retorno";
import { EnvioComponent } from "../../../../shared/ui/envio/envio.component";
import { HelperService } from "../../../../shared/services/helper.service";
import { RegLicitacao } from "../../../../shared/entity/LIC/reg-licitacao";

@Component({
  selector: "app-reg-licitacao-detail",
  templateUrl: "./reg-licitacao-detail.component.html",
  // viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]
})
export class RegLicitacaoDetailComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  protected dominios: Dominios[];
  private subscriptionRoute: Subscription;
  private subscriptionModalService: Subscription;
  protected hasDetalhamentoLc123: boolean = false;
  protected uuid: String;

  constructor(
    private service: RegLicitacaoService,
    private dominioService: DominioService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private alertService: AlertService,
    private modalService: ModalService,
    private helper: HelperService
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.subscriptionRoute = this.route.paramMap.subscribe((p) => {
      this.uuid = p.get("id");
      if (this.helper.isUUID(this.uuid)) {
        this.buscarRegulamentacao(this.uuid);
      }
    });

    this.sharedService.emitChange(this.formulario);

    this.dominioService
      .listaDominio(TABELAS_DOMINIOS.TIPO_DECRETO_REGULAMENTADOR, true)
      .subscribe((data) => (this.dominios = data));
  }

  ngOnDestroy(): void {
    this.formulario.reset();
    this.sharedService.emitChange({});
    this.subscriptionRoute.unsubscribe();
  }

  buscarRegulamentacao(uuid) {
    this.service.buscarPorUUID(uuid).subscribe((r) => {
      this.atualizaFormulario(r);
    });
  }

  save(isSubimited: boolean) {
    this.service
      .salvar(this.formulario.value)
      .subscribe((data: RegLicitacao) => {
        isSubimited
          ? this.alertService.showAlertSucess(
              `Salvo com sucesso`,
              "Regulamentação"
            )
          : EMPTY;
        this.buscarRegulamentacao(data.uuid);
      });
  }

  submit() {
    this.save(true);
  }

  transmitir() {
    this.alertService.showModal(EnvioComponent, {
      initialState: {
        title: "Envio Regulamentação dos procedimentos licitatórios",
      },
    });
    this.subscriptionModalService = this.modalService.changeEmitted$.subscribe(
      (o) => {
        this.atualizaFormulario(o);
        this.service
          .transmitirColare(this.formulario.value)
          .subscribe((data: ColareRetorno) => {
            this.atualizaFormulario(data);
            this.save(false);
            this.alertService.showAlertSucess(
              "Layout transmitido com sucesso",
              "Sucesso"
            );
          });
        this.subscriptionModalService.unsubscribe();
      }
    );
  }

  obterPDFHomologacao() {
    console.log(this.formValue("arquivo.recibo"));
    this.service
      .obterPdfHomologacaoColare(this.formValue("arquivo.recibo"))
      .subscribe(data => console.log);
  }
  //TODO - Implementar homologação
  homologar(file: File) {
    console.log(file);
    this.alertService.showAlertInfo(file.name, "OK");
  }
  //TODO - Implementar ação cancelar
  cancelar() {
    this.alertService.showAlertInfo("Cancelado", "OK");
  }

  private buildForm() {
    this.formulario.addControl("uuid", this.builder.control(null, []));
    this.formulario.addControl(
      "codTipoRegulamentacao",
      this.builder.control(null, [Validators.required])
    );
    this.formulario.addControl(
      "existeRegulamentacaoMunicipal",
      this.builder.control(false, [Validators.required])
    );
    this.formulario.addControl(
      "numeroDecretoMunicipal",
      this.builder.control(null, [])
    );
    this.formulario.addControl(
      "dataDecretoMunicipal",
      this.builder.control(null, [])
    );
    this.formulario.addControl(
      "dataPublicacao",
      this.builder.control(null, [])
    );
    this.formulario.addControl(
      "idDocumentoPDF",
      this.builder.control(null, [])
    );
    this.formulario.addControl("codTipoEnvio", this.builder.control(null, []));
    this.formulario.addControl(
      "motivoAtualizacaoCorrecao",
      this.builder.control(null, [])
    );
  }

  addOrRemoveDetalhamentoLc123() {
    //animate__fadeInDown
    this.hasDetalhamentoLc123 =
      this.formValue("codTipoRegulamentacao") == 3 ? true : false;
    if (this.hasDetalhamentoLc123)
      this.formulario.addControl("detalhamentoLc123", this.detalhamentoLc123());
    else {
      if (this.formValue("detalhamentoLc123", true))
        this.formulario.removeControl("detalhamentoLc123");
    }
  }

  private detalhamentoLc123() {
    return this.builder.group({
      regulamentouParticipExclusivaMEEPP: this.builder.control(null, [
        Validators.required,
      ]),
      artigoRegulamentouParticipExclusivaMEEPP: this.builder.control(null),
      valorLimiteRegParticipExclusivaMEEPP: this.builder.control(null),
      regulamentouProcSubContratacaoMEEPP: this.builder.control(null, [
        Validators.required,
      ]),
      artigoProcSubContratacaoMEEPP: this.builder.control(null),
      percentualSubContratacaoMEEPP: this.builder.control(null),
      regulamentouCriteriosEmpenhoPagamentoMEEPP: this.builder.control(null, [
        Validators.required,
      ]),
      artigoEmpenhoPagamentoMEEPP: this.builder.control(null),
      regulamentouPercObjetoContratacaoMEEPP: this.builder.control(null, [
        Validators.required,
      ]),
      artigoPercObjetoContratacaoMEEPP: this.builder.control(null),
      percentualObjetoContratacaoMEEPP: this.builder.control(null),
    });
  }
}
