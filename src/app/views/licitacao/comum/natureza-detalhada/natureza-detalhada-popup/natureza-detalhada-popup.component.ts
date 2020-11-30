import { NaturezaDoObjetoDetalhadaFaseUm } from "./../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { Tabela } from "../../../../../shared/entity/colare/tabelas";
import {
  EditalEAnexosFaseUm,
  PublicacaoFaseUm,
} from "../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { TABELAS_DOMINIOS } from "../../../../../shared/enum-layouts/tabelas";
import {
  AlertService,
  AlertTypes,
} from "../../../../../shared/services/alert.service";
import { BaseFormComponent } from "../../../../../shared/ui/base-form/base-form.component";
import { TabelaService } from "../../../../tabelas/service/tabelas.service";
import { LicitacaoFaseUmService } from "../../../service/licitacao-fase-um.service";

@Component({
  selector: "app-natureza-detalhada-popup",
  templateUrl: "./natureza-detalhada-popup.component.html",
  styleUrls: ["./natureza-detalhada-popup.component.css"],
})
export class NaturezaDetalhadaPopupComponent
  extends BaseFormComponent
  implements OnInit {
  btnTitle = "Adicionar";

  //TABELA
  naturezaObjeto$: Observable<Tabela[]>;

  data: {
    uuid: string;
    natureza: NaturezaDoObjetoDetalhadaFaseUm;
  };

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
    if (this.data?.natureza) {
      this.formulario.patchValue(this.data.natureza);
      this.btnTitle = "Atualizar";
    }

    this.naturezaObjeto$ = this.tabelaService.listaDominio(
      TABELAS_DOMINIOS.NATUREZA_DETALHADA,
      true
    );

    console.log(this.data);
    999999;
    this.getControl("codNaturezaObjetoDetalhada").valueChanges.subscribe(
      (value) => {
        if (value == 999999) {
          this.getControl("descricaoNaturezaObjetoOutros").enable();
          this.getControl("descricaoNaturezaObjetoOutros").setValidators(Validators.required);
          this.getControl("descricaoNaturezaObjetoOutros").updateValueAndValidity();
        } else {
          this.getControl("descricaoNaturezaObjetoOutros").reset();
          this.getControl("descricaoNaturezaObjetoOutros").clearValidators();
          this.getControl("descricaoNaturezaObjetoOutros").updateValueAndValidity();
          this.getControl("descricaoNaturezaObjetoOutros").disable();
        }
      }
    );
  }

  initForm() {
    this.adicionaControl(
      "codNaturezaObjetoDetalhada",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl(
      "descricaoNaturezaObjetoOutros",
      this.builder.control({ value: null, disabled: true })
    );
  }

  submit(value) {
    this.save(value);
  }

  private save(saveAndNew: boolean) {
    let opr = this.btnTitle === "Atualizar" ? "atualizada" : "incluída";
    this.removeControl("arquivo");
    this.service
      .adicionarNaTabela("NATUREZA-DO-OBJETO-DETALHADA", this.data.uuid, this.formValue())
      .subscribe((data: PublicacaoFaseUm) =>
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "SUCESSO",
          `Natureza Objeto ${opr} com sucesso.`
        )
      );

    saveAndNew ? this.formulario.reset() : this.cancelar();
  }

  onFormInvalid(fields?: any[]) {
    console.log(fields);

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
