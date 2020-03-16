import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChange
} from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { ActivatedRoute } from "@angular/router";
import { RegLicitacao } from "../../../../shared/entity/reg-licitacao";
import { SharedService } from "../../../../shared/services/shared-service.service";
import { AlertService } from "../../../../shared/services/alert.service";
import { Subscriber, Subscription } from "rxjs";
import { RegLicitacaoService } from "../../service/reg-licitacao.service";
import { DominioService } from "../../../dominio/service/dominio.service";
import { Dominios } from "../../../../shared/entity/dominio";
import { TABELAS_DOMINIOS } from "../../../../shared/tabelas";

@Component({
  selector: "app-reg-licitacao-detail",
  templateUrl: "./reg-licitacao-detail.component.html"
})
export class RegLicitacaoDetailComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  private regLicitacao: RegLicitacao;
  protected dominios: Dominios[];
  private subscription: Subscription;
  protected hasDetalhamentoLc123: boolean = false;

  constructor(
    private service: RegLicitacaoService,
    protected dominioService: DominioService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private alertService: AlertService
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(p => {
      let id = parseInt(p.get("id"));
      if (id) {
        this.service.loadByID(id).subscribe(r => {
          this.formulario.patchValue(r);
          //this.atualizaForm(r,this.formulario)
        });
      }
    });
    this.sharedService.emitChange(this.formulario);
    this.dominioService
      .listDominio(TABELAS_DOMINIOS.TIPO_DECRETO_REGULAMENTADOR, true)
      .subscribe(data => (this.dominios = data));
  }

  ngOnDestroy(): void {
    this.formulario.reset();
    this.sharedService.emitChange(this.formulario);
    this.subscription.unsubscribe();
  }

  save() {
    this.service.save(this.formulario.value).subscribe(s => {
      this.alertService.showAlertSucess(
        `Salvo com sucesso ${s["seqID"]}`,
        "Regulamentação"
      );
    });
  }

  submit() {}

  transmitir() {
    this.regLicitacao = new RegLicitacao(this.formulario.value);
    console.log(this.regLicitacao)
    this.service.postTCM(this.regLicitacao).subscribe(
      s => {
        console.log(s);
      },
      error => {
        console.log(error);
      }
    );
  }

  getFileUploadID(e) {
    console.log(e);
    this.atualizaForm(e, "idDocumentoPDF");
  }
  private buildForm() {
    this.formulario = this.builder.group(
      {
        seqID: this.builder.control(null, []),
        id: this.builder.control(null, []),
        codTipoRegulamentacao: this.builder.control(null, [
          Validators.required
        ]),
        existeRegulamentacaoMunicipal: this.builder.control(null, [
          Validators.required
        ]),
        numeroDecretoMunicipal: this.builder.control(null),
        dataDecretoMunicipal: this.builder.control(null),
        dataPublicacao: this.builder.control(null),
        idDocumentoPDF: this.builder.control(null),
        codTipoEnvio: this.builder.control(null, [Validators.required]),
        motivoAtualizacaoCorrecao: this.builder.control(null)
      },
      [Validators.required]
    );
  }

  addOrRemoveDetalhamentoLc123() {
    this.hasDetalhamentoLc123 = !this.hasDetalhamentoLc123;
    if (this.hasDetalhamentoLc123)
      this.formulario.addControl("detalhamentoLc123", this.detalhamentoLc123());
    else this.formulario.removeControl('detalhamentoLc123');
  }

  private detalhamentoLc123() {
    return this.builder.group({
      regulamentouParticipExclusivaMEEPP: this.builder.control(null, [
        Validators.required
      ]),
      artigoRegulamentouParticipExclusivaMEEPP: this.builder.control(null),
      valorLimiteRegParticipExclusivaMEEPP: this.builder.control(null),
      regulamentouProcSubContratacaoMEEPP: this.builder.control(null, [
        Validators.required
      ]),
      artigoProcSubContratacaoMEEPP: this.builder.control(null),
      percentualSubContratacaoMEEPP: this.builder.control(null),
      regulamentouCriteriosEmpenhoPagamentoMEEPP: this.builder.control(null, [
        Validators.required
      ]),
      artigoEmpenhoPagamentoMEEPP: this.builder.control(null),
      regulamentouPercObjetoContratacaoMEEPP: this.builder.control(null, [
        Validators.required
      ]),
      artigoPercObjetoContratacaoMEEPP: this.builder.control(null),
      percentualObjetoContratacaoMEEPP: this.builder.control(null)
    });
  }
}
