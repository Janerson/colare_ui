import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseFormComponent } from "../../ui/base-form/base-form.component";
import { ModalService } from "../../services/modal.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { DominioService } from "../../../views/dominio/service/dominio.service";
import { Dominios } from "../../entity/colare/dominio";
import { Subscription } from "rxjs";
import { TABELAS_DOMINIOS } from "../../tabelas";
import { Arquivo } from '../../entity/colare/colare-retorno';

@Component({
  selector: "app-envio",
  templateUrl: "./envio.component.html",
  styleUrls: ["./envio.component.css"],
})
export class EnvioComponent extends BaseFormComponent implements OnInit , OnDestroy{
  protected dominios: Dominios[];
  data : Arquivo
  private subscriptionDominio: Subscription;

  constructor(
    private modalService: ModalService,
    private bsModalRef: BsModalRef,
    protected dominioService: DominioService
  ) {
    super();
    this.buildForm();
  }
  ngOnDestroy(): void {
    this.subscriptionDominio.unsubscribe()
  }

  ngOnInit(): void {
    console.log(this.data)
    this.subscriptionDominio = this.dominioService
      .listaDominio(TABELAS_DOMINIOS.TIPO_DE_ENVIO,true)
      .subscribe((data) => (this.dominios = data));
  }

  private buildForm() {
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


  cancelar(e) {
    this.bsModalRef.hide();
  }
  // enviar(e) {
  //   this.modalService.emitChange(this.formulario.value);
  //   this.bsModalRef.hide();
  // }
}
