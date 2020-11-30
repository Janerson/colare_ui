import { LicitacaoFaseUm } from './../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { HelperService } from "./../../../../shared/services/helper.service";
import { Subscription } from "rxjs";
import { FormArray, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { LIC } from "../../../../shared/enum-layouts/lic";
import { FormService } from "../../../../shared/services/form.service";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { TabelaService } from "../../../tabelas/service/tabelas.service";
import { Tabela } from "../../../../shared/entity/colare/tabelas";
import { TABELAS_DOMINIOS } from "../../../../shared/enum-layouts/tabelas";
import { LicitacaoFaseUmService } from "../../service/licitacao-fase-um.service";
import {
  AlertService,
  AlertTypes,
} from "../../../../shared/services/alert.service";
import { EMPTY } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./licitacao-fase-um-detail.component.html",
  styleUrls: ["./licitacao-fase-um-detail.component.css"],
})
export class LicitacaoFaseUmDetailComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  protected layout = LIC.LICITACAOFASE1;
  protected subscription: Subscription;
 

  protected tbTitle = "Lote";
  protected tbTitle2 = "Recurso Orcamentario";

  /**TABELAS*/
  protected modalidadeLicitacao: Tabela[];
  protected naturezaProcedimento: Tabela[];
  protected tipoLicitacao: Tabela[];
  protected naturezaObjeto: Tabela[];
  protected regimeExecucao: Tabela[];
  /**TABELAS*/

  constructor(
    private formService: FormService,
    private tabelaService: TabelaService,
    protected service: LicitacaoFaseUmService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private helper: HelperService
  ) {
    super();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.formService.emitChange(this.formulario);
    this.criaFormulario();
    this.carregarTabelas();
    this.subscription.add(
      this.route.paramMap.subscribe((p) => {
        if (this.helper.isUUID(p.get("id"))) {
          this.buscarLicitacao(p.get("id"));
        }
      })
    );

    this.initFormChanges();
  }

  carregarTabelas() {
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.MODALIDADE_LICITACAO, true)
      .subscribe((data) => (this.modalidadeLicitacao = data));
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.NATUREZA_PROCEDIMENTO, true)
      .subscribe((data) => (this.naturezaProcedimento = data));
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.TIPO_LICITACAO, true)
      .subscribe((data) => (this.tipoLicitacao = data));
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.NATUREZA_DO_OBJETO, true)
      .subscribe((data) => (this.naturezaObjeto = data));
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.REGIME_EXECUCAO, true)
      .subscribe((data) => (this.regimeExecucao = data));
  }

  save(isSubimited: boolean) {
    this.service.salvar(this.formValue()).subscribe((data) => {
      isSubimited
        ? this.alertService.showToastr(
          AlertTypes.SUCESS,
          `Licitação`,
          "Salva com sucesso"
        )
        : EMPTY;
      this.buscarLicitacao(data.uuid);
    });
  }

  buscarLicitacao(uuid) {
    this.service.buscarPorUUID(uuid).subscribe((data) => {
      this.atualizaFormulario(data);
      this.addLote(data)
    });
  }

  submit() {
    this.save(true);
  }

  onFormInvalid(fields:Array<any>){
      this.alertService.showToastr(AlertTypes.DANGER,"ERROR",`Formulário com erros, verifique e tente novamente.`) 
   }


  onSelectTab(evt, tbNumber?) {
    if (tbNumber && tbNumber == 2) this.tbTitle2 = evt.heading;
    else this.tbTitle = evt.heading;
  }

  criaFormulario() {
    this.adicionaControl("exercicioLicitacao", this.builder.control(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern("[0-9]{4}")])
    );
    this.adicionaControl("numeroLicitacao", this.builder.control(null, Validators.required));
    this.adicionaControl("dataPrevistaAberturaSessao", this.builder.control(null, Validators.required));
    this.adicionaControl("objeto", this.builder.control(null, Validators.required));
    this.adicionaControl("criterioDesempateMEEPP", this.builder.control(false));
    this.adicionaControl("destinacaoExclusivaMEEPP", this.builder.control(false));
    this.adicionaControl("subcontratacaoMEEPP", this.builder.control(false));
    this.adicionaControl("limitePercObjetoContratacaoMEEPP", this.builder.control(false));
    this.adicionaControl("codModalidadeLicitacao", this.builder.control(null, Validators.required));
    this.adicionaControl("codNaturezaProcedimento", this.builder.control(null, Validators.required));
    this.adicionaControl("codTipoLicitacaoCriterioJulgamento", this.builder.control(null, Validators.required));
    this.adicionaControl("codRegimeExecucao", this.builder.control({ disabled: true }));
    this.adicionaControl("processoPorLote", this.builder.control(false));
    this.adicionaControl("numeroProcessoAdministrativo", this.builder.control(null, [
      Validators.required, Validators.pattern("[0-9]+[/][0-9]{4}")]));
    this.adicionaControl("codNaturezaObjeto", this.builder.control(null, Validators.required));
    this.adicionaControl("idDocumentoPDF", this.builder.control(null));
    this.adicionaControl("codTipoEnvio", this.builder.control(null));
    this.adicionaControl("motivoAtualizacaoCorrecao", this.builder.control(null));
    this.adicionaControl("idUnidadeGestora", this.builder.control(null, [Validators.required]));
    this.adicionaControl("servicoContinuo", this.builder.control(false));
    this.adicionaControl("numeroDeConvidados", this.builder.control(null));
    this.adicionaControl("descricaoPremioOuRemuneracaoConcurso", this.builder.control(null));
    this.adicionaControl("lote",this.builder.array([]))
    this.adicionaControl("publicacao",this.builder.array([]))
    this.adicionaControl("editalEAnexos",this.builder.array([]))
    this.adicionaControl("naturezaDoObjetoDetalhada",this.builder.array([]))
  }

  addLote(Lic:LicitacaoFaseUm){
    (this.getControl('lote') as FormArray).clear()

    Lic.lote?.forEach(lote => {
      (this.getControl('lote') as FormArray).push(  this.builder.group({
        uuid: this.builder.control(lote.uuid),
        numeroLote: this.builder.control(lote.numeroLote),
        descricaoLote: this.builder.control(lote.descricaoLote),
      }))
    })
  }

  onCodNaturezaObjeto() {
    let cod = this.formValue("codNaturezaObjeto");
    if (cod == 1000 || cod == 2000) {
      this.getControl("codRegimeExecucao").enable();
      this.getControl("codRegimeExecucao").setValidators(Validators.required);
      this.getControl("codRegimeExecucao").updateValueAndValidity();
      this.getControl("codRegimeExecucao").reset();
    } else {
      this.getControl("codRegimeExecucao").setErrors(null);
      this.getControl("codRegimeExecucao").clearAsyncValidators();
      this.getControl("codRegimeExecucao").updateValueAndValidity();
      //this.getControl("codRegimeExecucao").reset();
      this.getControl("codRegimeExecucao").disable();
      //this.getControl("codRegimeExecucao").updateValueAndValidity();
    }
  }

  initFormChanges() {
    this.getControl("codModalidadeLicitacao").valueChanges.subscribe(
      (value) => {
        if (value == 1) {
          //Modalidade Convite
          this.getControl("numeroDeConvidados").setValidators(Validators.required);
          this.getControl("numeroDeConvidados").updateValueAndValidity();
          this.getControl("descricaoPremioOuRemuneracaoConcurso").setValidators(null);
          this.getControl("descricaoPremioOuRemuneracaoConcurso").setValue(null);
          this.getControl("descricaoPremioOuRemuneracaoConcurso").updateValueAndValidity();
        }

        if (value == 4) {
          //Modalidade concurso
          this.getControl("codTipoLicitacaoCriterioJulgamento").clearValidators();
          this.getControl("codTipoLicitacaoCriterioJulgamento").setValue(null);
          this.getControl("codTipoLicitacaoCriterioJulgamento").disable();
          this.getControl("codTipoLicitacaoCriterioJulgamento").updateValueAndValidity();

          this.getControl("codNaturezaObjeto").clearValidators();
          this.getControl("codNaturezaObjeto").setValue(null);
          this.getControl("codNaturezaObjeto").disable();
          this.getControl("codNaturezaObjeto").updateValueAndValidity();

          this.getControl("codRegimeExecucao").clearValidators();
          this.getControl("codRegimeExecucao").setValue(null);
          this.getControl("codRegimeExecucao").disable();
          this.getControl("codRegimeExecucao").updateValueAndValidity();

          this.getControl("descricaoPremioOuRemuneracaoConcurso").setValidators(Validators.required);
          this.getControl("descricaoPremioOuRemuneracaoConcurso").updateValueAndValidity();

          this.getControl("numeroDeConvidados").setValue(null);
          this.getControl("numeroDeConvidados").setValidators(null);
          this.getControl("numeroDeConvidados").updateValueAndValidity();
        }

        // //Removendo os inputs caso Modalidade != 1 & 4
        // if (value != 1 && value != 4) {
        //   if (this.formValue("numeroDeConvidados", true))
        //     this.removeControl("numeroDeConvidados");
        //   if (this.formValue("descricaoPremioOuRemuneracaoConcurso", true))
        //     this.removeControl("descricaoPremioOuRemuneracaoConcurso");
        // }

        if (value != 4) {
          this.getControl("codTipoLicitacaoCriterioJulgamento").setValidators(Validators.required);
          this.getControl("codTipoLicitacaoCriterioJulgamento").updateValueAndValidity();
          this.getControl("codTipoLicitacaoCriterioJulgamento").enable();

          this.getControl("codNaturezaObjeto").setValidators(Validators.required);
          this.getControl("codNaturezaObjeto").updateValueAndValidity();
          this.getControl("codNaturezaObjeto").enable();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formService.emitChange({})
  }
}
