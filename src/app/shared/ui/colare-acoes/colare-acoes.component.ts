import { AlertService, AlertTypes } from "../../services/alert.service";
import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericService } from "../../services/colare-generic.service";
import { EnvioComponent } from "../envio/envio.component";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Component({
  selector: "c-layout-acoes[form][layout]",
  templateUrl: "./colare-acoes.component.html",
  styleUrls: ["./colare-acoes.component.css"],
})
export class ColareLayoutAcoesComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;
  @Input() layout: string;

  @Output() onTransmitir = new EventEmitter<boolean>();
  @Output() onSincronizar = new EventEmitter<boolean>();
  @Output() onRetificar = new EventEmitter<boolean>();

  //protected btnGravarText = "Gravar"

  private msg = `O processo de Retificação de Envio já Homologado,
  exige uma série de passos que devem ser realizados, para tal é imprescindível que execute
  todas as etapas do processo de retificação, e não feche o popup até que todas etapas sejam concluídas.
  Deseja realizar a retificação agora?`;

  private service: GenericService;

  @ViewChild("file") _file: ElementRef;

  isHomologado = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.validaAcoes();
    this.service = new GenericService(this.http, this.layout);
    // this.form.get('uuid').statusChanges.subscribe(value => {
    //   console.log(value)
    // })
  }

  homologar(file: File) {
    if (file) {
      this.service
        .homologarEnvioColare(this.form.value, file)
        .subscribe((d) => {
          this.alertService.showToastr(
            AlertTypes.SUCESS,
            "Envio Homologado com sucesso!",
            "Sucesso!"
          );
          this.onSincronizar.emit(true);
        });
    }
    this._file.nativeElement.value = null;
  }

  validaAcoes() {
    this.form.get("arquivo.statusEnvio").valueChanges.subscribe((value) => {
      this.isHomologado = value == "HOMOLOGADO" && value != null ? true : false;
    });
  }

  transmitir() {
    this.alertService
      .showModal(EnvioComponent, {
        initialState: {
          title: "Enviar Layout",
          data: this.form.get("arquivo").value,
        },
      })
      .onHidden.subscribe(() => this.onTransmitir.emit(true));
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
        switchMap((value) =>
          value ? this.service.excluir(this.form.get("uuid").value) : EMPTY
        )
      )
      .subscribe(() => {
        this.cancelar();
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "Registro excluído com sucesso!",
          "Sucesso"
        );
      });
  }

  obterPDFHomologacao() {
    this.service.obterPdfHomologacaoColare(
      this.form.get("arquivo.recibo").value
    );
  }

  retificar() {
    this.alertService.showConfirm(this.msg, "Atenção!").subscribe((value) => {
      if (value) {
        this.onRetificar.emit(value);
      }
    });
  }

  cancelar() {
    this.router.navigate([this.layout]);
  }
}
