import { TabelaService } from "./../../../../tabelas/service/tabelas.service";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ItemLoteFaseUm, LoteFaseUm } from "../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import {
  AlertService,
  AlertTypes,
} from "../../../../../shared/services/alert.service";
import { BaseFormComponent } from "../../../../../shared/ui/base-form/base-form.component";
import { LicitacaoFaseUmService } from "../../../service/licitacao-fase-um.service";
import { Tabela } from "../../../../../shared/entity/colare/tabelas";
import { TABELAS_DOMINIOS } from "../../../../../shared/enum-layouts/tabelas";

@Component({
  selector: "app-item-lote-detail",
  templateUrl: "./item-lote-detail.component.html",
  styleUrls: ["./item-lote-detail.component.css"],
})
export class ItemLoteDetailComponent
  extends BaseFormComponent
  implements OnInit {
  btnTitle = "Adicionar";

  data: {
    uuid: string;
    loteId: any;
    item : ItemLoteFaseUm
  };

  // TABELAS
  protected unidadesDeMedidas: Tabela[];
  protected origemValorReferencia: Tabela[];
  //

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private service: LicitacaoFaseUmService,
    private tabelaService: TabelaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data?.item) {
      this.formulario.patchValue(this.data.item);
      this.btnTitle = "Atualizar";
    }
    this.initValidacoesForm()
    this.initTabelas();
    console.log(this.data)
  }

  initTabelas() {
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.UNIDADES_DE_MEDIDA, true)
      .subscribe((data) => (this.unidadesDeMedidas = data));
    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.ORIGEM_VLR_REFERENCIA, true)
      .subscribe((data) => (this.origemValorReferencia = data));
  }

  initForm() {
    this.adicionaControl(
      "numeroItem",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "quantidade",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "descricao",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "codigoUnicoMercadoriaOuServico",
      this.builder.control(null)
    );
    this.adicionaControl(
      "codUnidadeMedida",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "valorDeReferencia",
      this.builder.control(null, [Validators.required, Validators.min(0)])
    );
    this.adicionaControl("precoMaximo", this.builder.control(false));
    this.adicionaControl(
      "codOrigemValorReferencia",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl(
      "quantidadeDesdobraUnidade",
      this.builder.control({ value: null, disabled: true })
    );
    this.adicionaControl(
      "descricaoOrigemValorReferencia",
      this.builder.control({ value: null, disabled: true })
    );
  }

  initValidacoesForm() {
    //Unidade de Medida Caixa/Fardo/Pacote = 16
    this.getControl("codUnidadeMedida").valueChanges.subscribe((value) => {
      if (value == 16) {
        this.getControl("quantidadeDesdobraUnidade").setValidators(
          Validators.required
        );
        this.getControl("quantidadeDesdobraUnidade").enable();
      }else{
        this.getControl("quantidadeDesdobraUnidade").clearValidators();
        this.getControl("quantidadeDesdobraUnidade").updateValueAndValidity();
        this.getControl("quantidadeDesdobraUnidade").disable();
      }
    });
    //Origem valor de Referencia = 9999
    this.getControl("codOrigemValorReferencia").valueChanges.subscribe(
      (value) => {
        if (value == 9999) {
          this.getControl("descricaoOrigemValorReferencia").setValidators(
            Validators.required
          );
          this.getControl("descricaoOrigemValorReferencia").enable();
        }else{
          this.getControl("descricaoOrigemValorReferencia").clearValidators();
          this.getControl("descricaoOrigemValorReferencia").updateValueAndValidity();
          this.getControl("descricaoOrigemValorReferencia").disable();
        }
      }
    );
  }

  submit(saveAndNew) {
    this.save(saveAndNew);
  }

  private save(saveAndNew: boolean) {
    let opr = this.btnTitle === "Atualizar" ? "atualizado" : "incluído";
    this.removeControl("arquivo");
    this.service
      .adicionarNaSubTabela(this.data.uuid,"LOTE", this.data.loteId,"ITEM",this.formValue())
      .subscribe(data => {
        console.log(data)
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "SUCESSO",
          `Item incluído com sucesso.`
        )
      })
        

    saveAndNew ? this.formulario.reset() : this.cancelar();
  }

  onFormInvalid(fields?: any[]) {
    console.log(this.data);
    this.alertService.showToastr(
      AlertTypes.DANGER,
      "ERROR",
      "Formulário com erro(s), verifique e tente novamente. "
    );
  }

  cancelar() {
    this.bsModalRef.hide();
  }
}
