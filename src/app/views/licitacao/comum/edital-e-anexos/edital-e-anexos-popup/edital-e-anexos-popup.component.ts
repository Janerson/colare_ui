import { EditalEAnexosFaseUm } from './../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Tabela } from '../../../../../shared/entity/colare/tabelas';
import { PublicacaoFaseUm } from '../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { TABELAS_DOMINIOS } from '../../../../../shared/enum-layouts/tabelas';
import { AlertService, AlertTypes } from '../../../../../shared/services/alert.service';
import { BaseFormComponent } from '../../../../../shared/ui/base-form/base-form.component';
import { TabelaService } from '../../../../tabelas/service/tabelas.service';
import { LicitacaoFaseUmService } from '../../../service/licitacao-fase-um.service';

@Component({
  selector: 'app-edital-e-anexos-popup',
  templateUrl: './edital-e-anexos-popup.component.html',
  styleUrls: ['./edital-e-anexos-popup.component.css']
})
export class EditalEAnexosPopupComponent 
extends BaseFormComponent
  implements OnInit {
  btnTitle = "Adicionar";

  //TABELA
  tipoEditalEAnexos$: Observable<Tabela[]>;

  data: {
    uuid: string;
    edital: EditalEAnexosFaseUm;
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
    if (this.data?.edital) {
      this.formulario.patchValue(this.data.edital);
      this.btnTitle = "Atualizar";
    }

    this.tipoEditalEAnexos$ = this.tabelaService.listaDominio(
      TABELAS_DOMINIOS.EDITAL_ANEXOS,
      true
    );

    console.log(this.data)
  }

  initForm() {
 
    this.adicionaControl(
      "codTipoEditalAnexos",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl("descricao", this.builder.control(null));
    this.adicionaControl(
      "idDocumentoPDF",
      this.builder.control(null, Validators.required)
    );
  }

  submit(value) {
    this.save(value);
  }

  private save(saveAndNew: boolean) {
    let opr = this.btnTitle === "Atualizar" ? "atualizada" : "incluída";
    this.removeControl("arquivo");
    this.service
      .adicionarNaTabela("EDITAL-E-ANEXOS", this.data.uuid, this.formValue())
      .subscribe((data: PublicacaoFaseUm) =>
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "SUCESSO",
          `Edital e Anexos ${opr} com sucesso.`
        )
      );

    saveAndNew ? this.formulario.reset() : this.cancelar();
  }

  onFormInvalid(fields?: any[]) {
    console.log(fields)

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
