import { LoteFaseUm } from './../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { LicitacaoFaseUmService } from "./../../service/licitacao-fase-um.service";
import {
  AlertService,
  AlertTypes,
} from "./../../../../shared/services/alert.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
//import { da } from 'date-fns/locale';

@Component({
  selector: "app-lote-popup",
  templateUrl: "./lote-popup.component.html",
  styleUrls: ["./lote-popup.component.css"],
})
export class LotePopupComponent extends BaseFormComponent implements OnInit {
  btnTitle = "Adicionar";

  data: {
    uuid: string;
    lote: LoteFaseUm;
  };

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private service: LicitacaoFaseUmService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data?.lote) {
      this.formulario.patchValue(this.data.lote);
      this.btnTitle = "Atualizar";
    }
  }

  initForm() {
    this.adicionaControl(
      "numeroLote",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl("descricaoLote", this.builder.control(null));
  }

  submit(value) {
    this.save(value);
  }

  private save(saveAndNew: boolean) {
    let opr = this.btnTitle === "Atualizar" ? "atualizado" : "incluído";
    this.removeControl("arquivo");
    this.service
      .adicionarNaTabela('LOTE',this.data.uuid, this.formValue())
      .subscribe((data : LoteFaseUm) =>
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "SUCESSO",
          `Lote ${data.numeroLote} ${opr} com sucesso.`
        )
      );

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
