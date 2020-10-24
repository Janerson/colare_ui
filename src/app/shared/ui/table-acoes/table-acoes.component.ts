import { AlertService, AlertTypes } from "./../../services/alert.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Component({
  selector: "table-acoes[botoes]",
  templateUrl: "./table-acoes.component.html",
  styleUrls: ["./table-acoes.component.css"],
})
export class TableAcoesComponent implements OnInit {
  /**
   * Array de string com nomes dos botões a serem exibidos
   * valores disponiveis ['editar','apagar']
   **/
  @Input() botoes: string[];

  /**
   *Evento disparado, no click do botão apagar
   */
  @Output() onApagar = new EventEmitter<boolean>();
  /**
   * vento disparado, no click do botão editar
   */
  @Output() onEditar = new EventEmitter<boolean>();

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

  excluir() {
    this.alertService
      .showConfirm(
        "Deseja realmente exluir este registro?",
        "Atenção",
        "SIM",
        "NÃO"
      )
      .subscribe((value) => (value ? this.onApagar.emit(true) : EMPTY));
  }
}
