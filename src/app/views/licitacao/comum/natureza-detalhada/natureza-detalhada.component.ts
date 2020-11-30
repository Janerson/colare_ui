import { NaturezaDetalhadaPopupComponent } from './natureza-detalhada-popup/natureza-detalhada-popup.component';
import { NaturezaDoObjetoDetalhadaFaseUm } from './../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { distinctUntilChanged, debounce, switchMap } from 'rxjs/operators';
import { Page } from '../../../../shared/entity/api/page';
import { Tabela } from '../../../../shared/entity/colare/tabelas';
import { EditalEAnexosFaseUm } from '../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { TABELAS_DOMINIOS } from '../../../../shared/enum-layouts/tabelas';
import { AlertService, AlertTypes } from '../../../../shared/services/alert.service';
import { BaseFormComponent } from '../../../../shared/ui/base-form/base-form.component';
import { TabelaService } from '../../../tabelas/service/tabelas.service';
import { LicitacaoFaseUmService } from '../../service/licitacao-fase-um.service';
import { EditalEAnexosPopupComponent } from '../edital-e-anexos/edital-e-anexos-popup/edital-e-anexos-popup.component';

@Component({
  selector: 'c-natureza-detalhada[form]',
  templateUrl: './natureza-detalhada.component.html',
  styleUrls: ['./natureza-detalhada.component.css']
})
export class NaturezaDetalhadaComponent extends BaseFormComponent implements OnInit {
  @Input() form: FormGroup;

  private subscription: Subscription = new Subscription();
  protected page: Page<NaturezaDoObjetoDetalhadaFaseUm>;
  private uuid: string;
  private naturezaDetalhada: Tabela[];

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
    this.listarNatureza();
    this.subscription.add(
      this.service.refresh.subscribe(() => this.listarNatureza())
    );

    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.NATUREZA_DETALHADA, true)
      .subscribe((data) => (this.naturezaDetalhada = data));
  }

  consultaNaturezaDetalhada(cod:string) {
    return this.naturezaDetalhada?.find(v => v.codigo == cod)
  }

  listarNatureza() {
    this.service
      .listarDadosTabela("NATUREZA-DO-OBJETO-DETALHADA", this.uuid)
      .subscribe((value) => {
        this.page = value;
        this.atulizarNatureza(value.content);
      });
  }

  atulizarNatureza(p: Array<NaturezaDoObjetoDetalhadaFaseUm>) {
    let arr = this.form.get("naturezaDoObjetoDetalhada") as FormArray;
    arr.clear();

    p?.forEach((edt) => {
      let nat = this.builder.group({
        uuid: edt.uuid,        
        codNaturezaObjetoDetalhada: edt.codNaturezaObjetoDetalhada,
        descricaoNaturezaObjetoOutros: edt.descricaoNaturezaObjetoOutros,
      
      });
      arr.push(nat);
    });
  }

  novoNatureza(natureza?: NaturezaDoObjetoDetalhadaFaseUm) {
    let opr = natureza ? "Atualizar" : "Adicionar";
    this.alertService.showModal(NaturezaDetalhadaPopupComponent, {
      class: "modal-md",
      initialState: {
        title: `${opr} natureza objeto detalhada`,
        data: {
          uuid: this.uuid,
          natureza: natureza,
        },
      },
    });
  }

  excluir(uuidDel) {
    this.service
      .deletarDaTabela("NATUREZA-DO-OBJETO-DETALHADA", this.uuid, uuidDel)
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
        "NATUREZA-DO-OBJETO-DETALHADA",
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
            "NATUREZA-DO-OBJETO-DETALHADA",
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
