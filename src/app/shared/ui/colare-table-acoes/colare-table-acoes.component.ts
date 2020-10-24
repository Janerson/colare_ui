import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GenericService } from "../../services/colare-generic.service";
import { AlertService, AlertTypes } from "../../services/alert.service";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Component({
  selector: "c-layout-table-acoes[botoes][layout][uuid][editOnPopup]",
  templateUrl: "./colare-table-acoes.component.html",
  styleUrls: ["./colare-table-acoes.component.css"],
})
export class ColareLayoutTableComponet implements OnInit {
  /**
   * Array de string com nomes dos botões a serem exibidos
   * valores disponiveis ['editar','apagar']
   **/
  @Input() botoes: string[];
  /**
   * Path do Layout Ex: LIC/LICITACAOFASEUM
   */
  @Input() layout: string;
  /**
   * UUID DO LAYOUT
   */
  @Input() uuid: string;
  /**
   * Tipo de Ediçao, quando true, será emitido
   * o evento onEditar, assim fica a cargo do Desenvolvedor criar a lógica de exclusão
   */
  @Input() editOnPopup: boolean;
  /**
   *Evento disparado quando feita a exclusão de
   *algum item
   */
  @Output() onNotify = new EventEmitter<boolean>();
  /**
   * Evento disparado caso o input editOnPopup=true
   */
  @Output() onEditar = new EventEmitter<boolean>();

  private service: GenericService;

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service = new GenericService(this.http, this.layout);
  }

  editar() {
    if (this.editOnPopup) this.onEditar.emit(true);
    else this.router.navigate([`${this.layout}/`, this.uuid]);
  }

  excluir() {
    this.alertService
      .showConfirm(
        "Deseja realmente exluir este registro?",
        "Atenção",
        "SIM",
        "NÃO"
      )
      .pipe(
        switchMap((value) => (value ? this.service.excluir(this.uuid) : EMPTY))
      )
      .subscribe(() =>
        this.alertService
          .showAlert(
            AlertTypes.SUCESS,
            "Registro excluído com sucesso!",
            "Sucesso"
          )
          .onHidden.subscribe(() => this.onNotify.emit(true))
      );
  }
}
