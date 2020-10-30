import { ItemLoteDetailComponent } from "./item-lote-detail/item-lote-detail.component";
import { LoteFaseUm } from "./../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ItemLoteFaseUm } from "../../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { Page } from "../../../../shared/entity/api/page";
import { AlertService } from "../../../../shared/services/alert.service";
import { LicitacaoFaseUmService } from "../../service/licitacao-fase-um.service";
import { Subscription } from "rxjs";

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
  private data: {
    idLayout: any;
    lote: LoteFaseUm;
  };

  constructor(
    private alertService: AlertService,
    private service: LicitacaoFaseUmService
  ) {
    super();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.adicionaControl("pesquisar", this.builder.control(null));
    this.listar();
    this.service.refresh.subscribe((data) => {this.listar()});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    console.log(item)
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

  submit(value?: any) {
    throw new Error("Method not implemented.");
  }

  onFormInvalid(fields?: any[]) {
    throw new Error("Method not implemented.");
  }
}
