
import { PublicacaoPopupComponent } from "./publicacao-popup/publicacao-popup.component";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { from, interval,  Subscription } from "rxjs";
import {
  debounce,
  distinctUntilChanged,
  find,
  switchMap,
} from "rxjs/operators";
import { BaseFormComponent } from '../../../../shared/ui/base-form/base-form.component';
import { Page } from '../../../../shared/entity/api/page';
import { Tabela } from '../../../../shared/entity/colare/tabelas';
import { PublicacaoFaseUm } from '../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { TABELAS_DOMINIOS } from '../../../../shared/enum-layouts/tabelas';
import { AlertService, AlertTypes } from '../../../../shared/services/alert.service';
import { TabelaService } from '../../../tabelas/service/tabelas.service';
import { LicitacaoFaseUmService } from '../../service/licitacao-fase-um.service';

@Component({
  selector: "c-publicacao[form]",
  templateUrl: "./publicacao.component.html",
  styleUrls: ["./publicacao.component.css"],
})
export class PublicacaoComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() form: FormGroup;

  private subscription: Subscription = new Subscription();
  protected page: Page<PublicacaoFaseUm>;
  private uuid: string;
  private veiculosPublicacao: Tabela[];

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
    this.listarPublicacoes();
    this.subscription.add(
      this.service.refresh.subscribe(() => this.listarPublicacoes())
    );

    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.VEICULOS_PUBLICACAO, true)
      .subscribe((data) => (this.veiculosPublicacao = data));
  }

  consultaVeiculoPublicacao(cod:string) {
    return this.veiculosPublicacao?.find(v => v.codigo == cod)
  }

  listarPublicacoes() {
    this.service
      .listarDadosTabela("PUBLICACAO", this.uuid)
      .subscribe((value) => {
        this.page = value;
        this.atualizarPublicao(value.content);
      });
  }

  atualizarPublicao(p: Array<PublicacaoFaseUm>) {
    let arr = this.form.get("publicacao") as FormArray;
    arr.clear();

    p?.forEach((pub) => {
      let publicacao = this.builder.group({
        uuid: pub.uuid,
        dataPublicacao: pub.dataPublicacao,
        codVeiculoPublicacao: pub.codVeiculoPublicacao,
        descricao: pub.descricao,
        idDocumentoPDF: pub.idDocumentoPDF,
      });
      arr.push(publicacao);
    });
  }

  novoPublicacao(publicao?: PublicacaoFaseUm) {
    let opr = publicao ? "Atualizar" : "Adicionar";
    this.alertService.showModal(PublicacaoPopupComponent, {
      class: "modal-lg",
      initialState: {
        title: `${opr} Publicação`,
        data: {
          uuid: this.uuid,
          publicacao: publicao,
        },
      },
    });
  }

  excluir(uuidDel) {
    this.service
      .deletarDaTabela("PUBLICACAO", this.uuid, uuidDel)
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
        "PUBLICACAO",
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
            "PUBLICACAO",
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
