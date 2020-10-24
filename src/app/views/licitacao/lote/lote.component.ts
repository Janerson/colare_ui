import { FormArray } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { interval, Subscription } from "rxjs";
import { LotePopupComponent } from "./lote-popup/lote-popup.component";
import {
  AlertService,
  AlertTypes,
} from "./../../../shared/services/alert.service";
import { Component, Input, OnInit } from "@angular/core";
import { Page } from "../../../shared/entity/api/page";
import { Lote } from "../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { LicitacaoFaseUmService } from "../service/licitacao-fase-um.service";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { debounce, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "c-lote[form]",
  templateUrl: "./lote.component.html",
  styleUrls: ["./lote.component.css"],
})
export class LoteComponent extends BaseFormComponent implements OnInit {
  @Input() form: FormGroup;
  protected page: Page<Lote>;
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

  listarLote() {
    this.service.listarDadosTabela("LOTE", this.uuid).subscribe((value) => {
      this.page = value;
      this.lote(value.content)
    });
  }

  lote(l: Array<Lote>) {
    let arr = this.form.get("lote") as FormArray;
    arr.clear();
    l?.forEach((v) => {
      arr.push(
        this.builder.group({
          uuid: v.uuid,
          numeroLote: v.numeroLote,
          descricaoLote: v.descricaoLote,
          faseUm:v.faseUm['uuid']
        })
      );
    });
  }

  novoLote(lote?: Lote) {
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
