
import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

import { Validators } from "@angular/forms";
import { Tabela } from '../../../../../shared/entity/colare/tabelas';
import { PublicacaoFaseUm } from '../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { TABELAS_DOMINIOS } from '../../../../../shared/enum-layouts/tabelas';
import { AlertService, AlertTypes } from '../../../../../shared/services/alert.service';
import { BaseFormComponent } from '../../../../../shared/ui/base-form/base-form.component';
import { TabelaService } from '../../../../tabelas/service/tabelas.service';
import { LicitacaoFaseUmService } from '../../../service/licitacao-fase-um.service';


@Component({
  selector: "app-publicacao-popup",
  templateUrl: "./publicacao-popup.component.html",
  styleUrls: ["./publicacao-popup.component.css"],
})
export class PublicacaoPopupComponent
  extends BaseFormComponent
  implements OnInit {
  btnTitle = "Adicionar";

  //TABELA
  veiculosPublicacao$: Observable<Tabela[]>;

  data: {
    uuid: string;
    publicacao: PublicacaoFaseUm;
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
    if (this.data?.publicacao) {
      this.formulario.patchValue(this.data.publicacao);
      this.btnTitle = "Atualizar";
    }

    this.veiculosPublicacao$ = this.tabelaService.listaDominio(
      TABELAS_DOMINIOS.VEICULOS_PUBLICACAO,
      true
    );

    this.getControl('codVeiculoPublicacao').valueChanges.subscribe(value => {
        if(value == 9999){
          this.getControl('descricao').enable()
          this.getControl('descricao').setValidators(Validators.required)
          this.getControl('descricao').updateValueAndValidity()          
        }else{
          this.getControl('descricao').reset()
          this.getControl('descricao').clearValidators()
          this.getControl('descricao').updateValueAndValidity()   
          this.getControl('descricao').disable()
          
        }
    })

    console.log(this.data)
  }

  initForm() {
    this.adicionaControl(
      "dataPublicacao",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl(
      "codVeiculoPublicacao",
      this.builder.control(null, Validators.required)
    );
    this.adicionaControl("descricao", this.builder.control({value:null, disabled : true}));
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
      .adicionarNaTabela("PUBLICACAO", this.data.uuid, this.formValue())
      .subscribe((data: PublicacaoFaseUm) =>
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "SUCESSO",
          `Publicação ${opr} com sucesso.`
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
