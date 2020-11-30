import { FormArray } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { interval, Subscription } from "rxjs";
import { LotePopupComponent } from "./lote-popup/lote-popup.component";

import { Component, Input, OnDestroy, OnInit } from "@angular/core";

import { debounce, distinctUntilChanged, switchMap } from "rxjs/operators";
import { ItensLoteComponent } from "./itens-lote/itens-lote.component";
import { Page } from '../../../../shared/entity/api/page';
import { LoteFaseUm } from '../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { AlertService, AlertTypes } from '../../../../shared/services/alert.service';
import { BaseFormComponent } from '../../../../shared/ui/base-form/base-form.component';
import { LicitacaoFaseUmService } from '../../service/licitacao-fase-um.service';

@Component({
  selector: "c-lote[form]",
  templateUrl: "./lote.component.html",
  styleUrls: ["./lote.component.css"],
})
export class LoteComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  protected page: Page<LoteFaseUm>;
  private uuid: string;

  private subscription: Subscription;

  constructor(
    private alertService: AlertService,
    private service: LicitacaoFaseUmService
  ) {
    super();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.uuid = this.form.get("uuid").value;
    this.listarLote();
    this.subscription.add(
      this.service.refresh.subscribe(() => this.listarLote())
    );
    this.adicionaControl("pesquisar", this.builder.control(null));
    this.onValueChanged();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listarLote() {
    this.service.listarDadosTabela("LOTE", this.uuid).subscribe((value) => {
      this.page = value;
      //this.form.get('lote').patchValue(value.content)
      this.updateLote(value.content);
    });
  }

  updateLote(l: Array<LoteFaseUm>) {
    let arr = this.form.get("lote") as FormArray;
    arr.clear();

    l?.forEach((v) => {
      let items = this.builder.array([]);
      let lote = this.builder.group({
        uuid: v.uuid,
        numeroLote: v.numeroLote,
        descricaoLote: v.descricaoLote,
      });

      if (v.item) {
        v.item.forEach((i) => {
          items.push(
            this.builder.group({
              uuid: i.uuid,
              numeroItem: i.numeroItem,
              quantidade: i.quantidade,
              descricao: i.descricao,
              codigoUnicoMercadoriaOuServico: i.codigoUnicoMercadoriaOuServico,
              codUnidadeMedida: i.codUnidadeMedida,
              valorDeReferencia: i.valorDeReferencia,
              precoMaximo: i.precoMaximo,
              codOrigemValorReferencia: i.codOrigemValorReferencia,
              quantidadeDesdobraUnidade: i.quantidadeDesdobraUnidade,
              descricaoOrigemValorReferencia: i.descricaoOrigemValorReferencia,
            })
          );
        });
        lote.addControl("item", items);
      }
      arr.push(lote);
    });
  }

  novoLote(lote?: LoteFaseUm) {
    this.alertService.showModal(LotePopupComponent, {
      class: "modal-md",
      initialState: {
        title: "Adicionar Lote",
        data: {
          uuid: this.uuid,
          lote: lote,
        },
      },
    });
  }

  adicionarItem(lote: LoteFaseUm) {
    this.alertService.showModal(ItensLoteComponent, {
      class: "modal-xl",
      ignoreBackdropClick: true,
      initialState: {
        title: "Item",
        data: {
          idLayout: this.uuid,
          lote: lote,
        },
      },
    });
  }

  excluir(uuidDel) {
    this.service
      .deletarDaTabela("LOTE", this.uuid, uuidDel)
      .subscribe(() =>
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "Sucesso",
          "Lote excluído"
        )
      );
  }

  pageChanged(event): void {
    this.service
      .listarDadosTabela(
        "LOTE",
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
        switchMap((value: any) =>
          this.service.listarDadosTabela(
            "LOTE",
            this.uuid,
            0,
            this.formValue("pesquisar")
          )
        )
      )
      .subscribe(
        (result: any) => {
          this.page = result;
        },
        (error: { message: string }) => console.log(error.message)
      );
  }

  submit(value?: any) {
    throw new Error("Method not implemented.");
  }
  onFormInvalid(fields?: any[]) {
    throw new Error("Method not implemented.");
  }
}
