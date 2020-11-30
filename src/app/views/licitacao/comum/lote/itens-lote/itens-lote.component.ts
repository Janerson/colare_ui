import { TabelaService } from "./../../../../tabelas/service/tabelas.service";
import { ItemLoteDetailComponent } from "./item-lote-detail/item-lote-detail.component";
import { LoteFaseUm } from "./../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ItemLoteFaseUm } from "../../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { BaseFormComponent } from "../../../../../shared/ui/base-form/base-form.component";
import { Page } from "../../../../../shared/entity/api/page";
import {
  AlertService,
  AlertTypes,
} from "../../../../../shared/services/alert.service";
import { LicitacaoFaseUmService } from "../../../service/licitacao-fase-um.service";
import { interval, Subscription } from "rxjs";
import { debounce, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Tabela } from "../../../../../shared/entity/colare/tabelas";
import { TABELAS_DOMINIOS } from "../../../../../shared/enum-layouts/tabelas";

@Component({
  selector: "app-itens-lote",
  templateUrl: "./itens-lote.component.html",
  styleUrls: ["./itens-lote.component.css"],
})
export class ItensLoteComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  protected page: Page<ItemLoteFaseUm>;
  private subscription: Subscription;

  protected unidadesDeMedidas: Tabela[];

  private data: {
    idLayout: any;
    lote: LoteFaseUm;
  };

  constructor(
    private alertService: AlertService,
    private service: LicitacaoFaseUmService,
    private tabelaService: TabelaService
  ) {
    super();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.adicionaControl("pesquisar", this.builder.control(null));
    this.listar();
    this.service.refresh.subscribe((data) => {
      this.listar();
    });
    this.onValueChanged();

    this.tabelaService
      .listaDominio(TABELAS_DOMINIOS.UNIDADES_DE_MEDIDA, true)
      .subscribe((data) => (this.unidadesDeMedidas = data));

    console.log(this.data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUnidadeById(codigo): Tabela {
    return this.unidadesDeMedidas.find((un) => (un.codigo == codigo));
  }

  listar() {
    this.service
      .listarDadosSubTabela(
        this.data?.idLayout,
        "LOTE",
        this.data.lote?.uuid,
        "ITEM"
      )
      .subscribe((data) => {
        this.page = data;
      });
  }

  addItem(item?: ItemLoteFaseUm) {
    console.log(item);
    this.alertService.showModal(ItemLoteDetailComponent, {
      class: "modal-xl",
      ignoreBackdropClick: true,
      initialState: {
        title: "Item",
        data: {
          idLayout: this.data?.idLayout,
          loteId: this.data?.lote?.uuid,
          item: item,
        },
      },
    });
  }

  excluirItem(uuid: any) {
    this.service
      .deletarDaSubTabela(
        this.data?.idLayout,
        "LOTE",
        this.data?.lote?.uuid,
        "ITEM",
        uuid
      )
      .subscribe(() =>
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "Sucesso",
          "Item excluído com sucesso."
        )
      );
  }

  pageChanged(event): void {
    this.service
      .listarDadosSubTabela(
        this.data.idLayout,
        "LOTE",
        this.data.lote.uuid,
        "ITEM",
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
          this.service.listarDadosSubTabela(
            this.data?.idLayout,
            "LOTE",
            this.data.lote?.uuid,
            "ITEM",
            0,
            value
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
