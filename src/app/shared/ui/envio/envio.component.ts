import { Tabela } from '../../entity/colare/tabelas';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseFormComponent } from "../../ui/base-form/base-form.component";
import { ModalService } from "../../services/modal.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { TABELAS_DOMINIOS } from "../../enum-layouts/tabelas";
import { Arquivo } from '../../entity/colare/colare-retorno';
import { TabelaService } from '../../../views/tabelas/service/tabelas.service';

@Component({
  templateUrl: "./envio.component.html",
  styleUrls: ["./envio.component.css"],
})
export class EnvioComponent extends BaseFormComponent implements OnInit , OnDestroy{
  protected tabelas: Tabela[];
  data : Arquivo
  private subscriptionDominio: Subscription;

  constructor(
    private modalService: ModalService,
    private bsModalRef: BsModalRef,
    protected dominioService: TabelaService
  ) {
    super();
    this.criaForm();
  }
  ngOnDestroy(): void {
    this.subscriptionDominio.unsubscribe()
  }

  ngOnInit(): void {
    this.subscriptionDominio = this.dominioService
      .listaDominio(TABELAS_DOMINIOS.TIPO_DE_ENVIO,true)
      .subscribe((data) => (this.tabelas = data));
  }

  private criaForm() {
    this.formulario = this.builder.group(
      {
        codTipoEnvio: this.builder.control(null, [Validators.required]),
        motivoAtualizacaoCorrecao: this.builder.control(null),
      },
      [Validators.required]
    );
  }

   submit(){
     this.modalService.emitChange(this.formulario.value);
     this.bsModalRef.hide();
   }


  cancelar() {
    this.bsModalRef.hide();
  }
  // enviar(e) {
  //   this.modalService.emitChange(this.formulario.value);
  //   this.bsModalRef.hide();
  // }
}
