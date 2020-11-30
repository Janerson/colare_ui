import { EditalEAnexosPopupComponent } from './edital-e-anexos-popup/edital-e-anexos-popup.component';
import {  EditalEAnexosFaseUm } from './../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { distinctUntilChanged, debounce, switchMap } from 'rxjs/operators';
import { Page } from '../../../../shared/entity/api/page';
import { Tabela } from '../../../../shared/entity/colare/tabelas';
import { PublicacaoFaseUm } from '../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { TABELAS_DOMINIOS } from '../../../../shared/enum-layouts/tabelas';
import { AlertService, AlertTypes } from '../../../../shared/services/alert.service';
import { BaseFormComponent } from '../../../../shared/ui/base-form/base-form.component';
import { TabelaService } from '../../../tabelas/service/tabelas.service';
import { LicitacaoFaseUmService } from '../../service/licitacao-fase-um.service';

@Component({
  selector: 'c-edital-e-anexos[form]',
  templateUrl: './edital-e-anexos.component.html',
  styleUrls: ['./edital-e-anexos.component.css']
})
export class EditalEAnexosComponent extends BaseFormComponent
implements OnInit, OnDestroy {
  @Input() form: FormGroup;

  private subscription: Subscription = new Subscription();
  protected page: Page<EditalEAnexosFaseUm>;
  private uuid: string;
  private tipoEditalEAnexos: Tabela[];

  constructor(
    private alertService: AlertService,
    private service: LicitacaoFaseUmService,
    private tabelaService: TabelaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.uuid = this.form.get("uuid").value;
    this.adicionaControl("pesquisar", this.builder.control(null));
    this.onValueChanged();
    this.listarEditais();
    this.subscription.add(
      this.service.refresh.subscribe(() => this.listarEditais())
    );

    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.EDITAL_ANEXOS, true)
      .subscribe((data) => (this.tipoEditalEAnexos = data));
  }

  consultaTipoEditalEAnexos(cod:string) {
    return this.tipoEditalEAnexos?.find(v => v.codigo == cod)
  }

  listarEditais() {
    this.service
      .listarDadosTabela("EDITAL-E-ANEXOS", this.uuid)
      .subscribe((value) => {
        this.page = value;
        this.atualizarPublicao(value.content);
      });
  }

  atualizarPublicao(p: Array<EditalEAnexosFaseUm>) {
    let arr = this.form.get("editalEAnexos") as FormArray;
    arr.clear();

    p?.forEach((edt) => {
      let edital = this.builder.group({
        uuid: edt.uuid,        
        codTipoEditalAnexos: edt.codTipoEditalAnexos,
        descricao: edt.descricao,
        idDocumentoPDF: edt.idDocumentoPDF,
      });
      arr.push(edital);
    });
  }

  novoEdital(edital?: EditalEAnexosFaseUm) {
    let opr = edital ? "Atualizar" : "Adicionar";
    this.alertService.showModal(EditalEAnexosPopupComponent, {
      class: "modal-md",
      initialState: {
        title: `${opr} Edital e Anexos`,
        data: {
          uuid: this.uuid,
          edital: edital,
        },
      },
    });
  }

  excluir(uuidDel) {
    this.service
      .deletarDaTabela("EDITAL-E-ANEXOS", this.uuid, uuidDel)
      .subscribe(() =>
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "Sucesso",
          "Publicação excluída"
        )
      );
  }

  pageChanged(event): void {
    this.service
      .listarDadosTabela(
        "EDITAL-E-ANEXOS",
        this.uuid,
        event.page - 1,
        this.formValue("pesquisar")
      )
      .subscribe((data) => {
        this.page = data;
      });
  }

  onValueChanged() {
    this.formulario
      .get("pesquisar")
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounce(() => interval(250)),
        switchMap(() =>
          this.service.listarDadosTabela(
            "EDITAL-E-ANEXOS",
            this.uuid,
            0,
            this.formValue("pesquisar")
          )
        )
      )
      .subscribe((result: any) => {
        this.page = result;
      });
  }

  submit(value?: any) {
    throw new Error("Method not implemented.");
  }
  onFormInvalid(fields?: any[]) {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy(): void {}

}
