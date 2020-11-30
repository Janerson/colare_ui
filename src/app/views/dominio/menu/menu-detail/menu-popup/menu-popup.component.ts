import {
  AlertService,
  AlertTypes,
} from "./../../../../../shared/services/alert.service";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalService } from "../../../../../shared/services/modal.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { MenuLink } from "../../../../../shared/entity/api/menu-links";
import { MenuService } from "../../../../../shared/services/menu.service";

@Component({
  templateUrl: "./menu-popup.component.html",
  styleUrls: ["./menu-popup.component.css"],
})
export class MenuPopupComponent implements OnInit {
  formulario: FormGroup;
  data: {
    uuid: string;
    menu: MenuLink;
  };
  btnTitle = "Adicionar";

  constructor(
    private builder: FormBuilder,
    private alerttService: AlertService,
    private bsModalRef: BsModalRef,
    private service: MenuService
  ) {}

  ngOnInit(): void {
    this.formulario = this.builder.group({
      uuid: this.builder.control(null),
      name: this.builder.control(null, [Validators.required]),
      url: this.builder.control(null, [Validators.required]),
      icon: this.builder.control(null),
      nomeTabelaColare: this.builder.control(null),
    });

    if (this.data?.menu) {
      this.formulario.patchValue(this.data.menu);
      this.btnTitle = "Atualizar";
    }
  }

  onSubmit(addNew?: boolean) {
    //this.modalService.emitChange(this.formulario.value);
    addNew ? this.addNovo() : this.addFechar();
  }
  private addNovo() {
    this.salvar();
    this.formulario.reset();
  }

  private addFechar() {
    //this.modalService.emitChange(this.formulario.value);
    this.salvar();
    this.cancelar();
  }
  cancelar() {
    this.bsModalRef.hide();
  }

  private salvar() {
    if (this.data.menu) {
      this.service
        .salvar(this.formulario.value)
        .subscribe(() =>
          this.alerttService.showToastr(
            AlertTypes.SUCESS,
            "Sucesso",
            "Link Atualizado com sucesso."
          )
        );
    } else {
      this.service
        .listaAdd(this.data.uuid, this.formulario.value)
        .subscribe(() =>
          this.alerttService.showToastr(
            AlertTypes.SUCESS,
            "Sucesso",
            "Link incluído com sucesso."
          )
        );
    }
  }
}
