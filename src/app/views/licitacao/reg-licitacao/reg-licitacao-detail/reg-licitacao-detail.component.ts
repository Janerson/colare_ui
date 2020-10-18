import { Tabela } from '../../../../shared/entity/colare/tabelas';
import {
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription, EMPTY } from "rxjs";

import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { FormService } from "../../../../shared/services/form.service";
import {
  AlertService,
  AlertTypes,
} from "../../../../shared/services/alert.service";
import { RegLicitacaoService } from "../../service/reg-licitacao.service";
import { TABELAS_DOMINIOS } from "../../../../shared/enum-layouts/tabelas";
import { ModalService } from "../../../../shared/services/modal.service";
import {
  ColareRetorno,
} from "../../../../shared/entity/colare/colare-retorno";
import { HelperService } from "../../../../shared/services/helper.service";
import { RegLicitacao } from "../../../../shared/entity/LIC/reg_licitacao/reg-licitacao";
import { LicRetificaPopupComponent } from "../../lic-retifica-popup/lic-retifica-popup.component";
import { LIC } from "../../../../shared/enum-layouts/lic";
import { TabelaService } from '../../../tabelas/service/tabelas.service';

@Component({
  selector: "app-reg-licitacao-detail",
  templateUrl: "./reg-licitacao-detail.component.html",
  // viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]
})
export class RegLicitacaoDetailComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  protected dominios: Tabela[];
  private subscriptionRoute: Subscription;
  private subscriptionModalService: Subscription;
  protected hasDetalhamentoLc123: boolean = false;
  protected uuid: String;
  protected layout = LIC.REG_LICITACAO;

 

  constructor(
    private service: RegLicitacaoService,
    private tabelaService: TabelaService,
    private route: ActivatedRoute,
    private formService: FormService,
    private alertService: AlertService,
    private modalService: ModalService,
    private helper: HelperService
  ) {
    super();
    this.criaForm();
  }

  ngOnInit(): void {
    this.subscriptionRoute = this.route.paramMap.subscribe((p) => {
      this.uuid = p.get("id");
      if (this.helper.isUUID(this.uuid)) {
        this.buscarRegulamentacao(this.uuid);
      }
    });

    this.formService.emitChange(this.formulario);

    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.TIPO_DECRETO_REGULAMENTADOR, true)
      .subscribe((data) => (this.dominios = data));
  }

  ngOnDestroy(): void {
    this.formulario.reset();
    this.formService.emitChange({});
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
          ? this.alertService.showAlert(
              AlertTypes.SUCESS,
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

  onFormInvalid(){
   this.alertService.showToastr(AlertTypes.DANGER,"ERROR","Verifique os erros e tente novamente.")
   }


  transmitir() {  
    this.subscriptionModalService = this.modalService.changeEmitted$.subscribe(
      (o) => {
        this.atualizaFormulario(o);
        this.save(false)
        this.onTransmitir(false);
        this.subscriptionModalService.unsubscribe();
      }
    );
  }

  private onTransmitir(isRetificacao: boolean) {
    this.service
      .transmitirColare(this.formulario.value)
      .subscribe((data: ColareRetorno) => {
        this.atualizaFormulario(data);
        this.save(false);
        if (!isRetificacao) {
          this.alertService.showAlert(
            AlertTypes.SUCESS,
            "Layout transmitido com sucesso",
            "Sucesso"
          );
        }
      });
  }

  sincronizar() {
    this.service.getColare(this.formValue()).subscribe((data) => {
      this.atualizaFormColare(data);
      this.save(false);
      this.alertService.showAlert(
        AlertTypes.SUCESS,"Layout Sincronizado com sucesso!","Sucesso");
    });
  }

  retificar() {
    this.alertService.showModal(LicRetificaPopupComponent, {
      ignoreBackdropClick: true,
      class: "modal-lg",
      initialState: {
        title: "RETIFICAR ENVIO",
        data: this.formValue("arquivo.id"),
      },
    });

    this.modalService.changeEmitted$.subscribe((value: boolean) => {
      if (value) {
        this.alertService
          .showAlert(
            AlertTypes.SUCESS,
            "Retificação efetuada com sucesso!",
            "Retificação"
          )
          .onHide.subscribe(() => {
            this.atualizaFormulario(
              {
                statusEnvio: "NAO_HOMOLOGADO",
                arquivoHomologacao: null,
              },
              "arquivo"
            );
            this.save(false);
            //this.onTransmitir(true);
          });
      }
    });
  }

  private criaForm() {
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
    },[Validators.required]);
  }
}
