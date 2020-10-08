import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { LIC } from "../../../../shared/enum-layouts/lic";
import { FormService } from "../../../../shared/services/form.service";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { TabelaService } from "../../../tabelas/service/tabelas.service";
import { Tabela } from "../../../../shared/entity/colare/tabelas";
import { TABELAS_DOMINIOS } from "../../../../shared/enum-layouts/tabelas";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { truncate } from "fs";

@Component({
  templateUrl: "./licitacao-fase-um-detail.component.html",
  styleUrls: ["./licitacao-fase-um-detail.component.css"],
})
export class LicitacaoFaseUmDetailComponent
  extends BaseFormComponent
  implements OnInit {
  protected layout = LIC.LICITACAOFASE1;
  protected dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: "codigo",
    textField: "descricao",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  /**TABELAS*/
  protected modalidadeLicitacao: Tabela[];
  /**TABELAS*/

  constructor(
    private formService: FormService,
    private tabelaService: TabelaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formService.emitChange(this.formulario);
    this.criaFormulario();
    this.buscarTabelas();
  }

  buscarTabelas() {
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.MODALIDADE_LICITACAO, true)
      .subscribe((data) => (this.modalidadeLicitacao = data));
  }

  submit() {
    alert("Implementar save");
  }

  onCodModalidade(e) {
    (<FormControl>this.formValue("codModalidadeLicitacao", true)).setValue(
      e.codigo
    );
  }

  criaFormulario() {
    this.adicionaControl(
      "exercicioLicitacao",
      this.builder.control(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ])
    );
    this.adicionaControl(
      "numeroLicitacao",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl(
      "dataPrevistaAberturaSessao",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl(
      "objeto",
      this.builder.control(null, Validators.required)
    );
    //TODO - Validar Modalidade
    //this.adicionaControl('numeroDeConvidados',this.builder.control(null,Validators.required)) //Preencher somente e obrigatoriamente se a Modalidade = Convite
    this.adicionaControl(
      "numeroDeConvidados",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl("criterioDesempateMEEPP", this.builder.control(false));
    this.adicionaControl(
      "destinacaoExclusivaMEEPP",
      this.builder.control(false)
    );
    this.adicionaControl("subcontratacaoMEEPP", this.builder.control(false));
    this.adicionaControl(
      "limitePercObjetoContratacaoMEEPP",
      this.builder.control(false)
    );
    this.adicionaControl(
      "codModalidadeLicitacao",
      this.builder.control(5, Validators.required)
    );
    this.adicionaControl(
      "codNaturezaProcedimento",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl(
      "codTipoLicitacaoCriterioJulgamento",
      this.builder.control(null)
    );
    this.adicionaControl("codRegimeExecucao", this.builder.control(null));
    this.adicionaControl("processoPorLote", this.builder.control(false));
    this.adicionaControl(
      "numeroProcessoAdministrativo",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "codNaturezaObjeto",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "idDocumentoPDF",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "codTipoEnvio",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "motivoAtualizacaoCorrecao",
      this.builder.control(null)
    );
    this.adicionaControl(
      "idUnidadeGestora",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl("servicoContinuo", this.builder.control(false));
    //TODO Preencher somente e obrigatoriamente se Modalidade = Concurso.
    //this.adicionaControl('descricaoPremioOuRemuneracaoConcurso',this.builder.control(false,Validators.required))
  }
}
