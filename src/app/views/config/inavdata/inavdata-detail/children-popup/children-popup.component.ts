import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalService } from "../../../../../shared/services/modal.service";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MenuLink } from '../../../../../shared/entity/api/menu-links';

@Component({
  selector: "app-children-popup",
  templateUrl: "./children-popup.component.html",
  styleUrls: ["./children-popup.component.css"],
})
export class ChildrenPopupComponent implements OnInit {
  formulario: FormGroup;
  data : MenuLink;

  constructor(
    private builder: FormBuilder,
    private modalService: ModalService,
    private bsModalRef : BsModalRef
  ) {}

  ngOnInit(): void {
    this.formulario = this.builder.group({
      name: this.builder.control(null, [Validators.required]),
      url: this.builder.control(null, [Validators.required]),
      icon: this.builder.control(null, [Validators.required]),
    });

    if(this.data)this.formulario.patchValue(this.data)
  }

  onSubmit() {
    this.modalService.emitChange(this.formulario.value);
    this.formulario.reset()
  }

  addFechar(){
    this.modalService.emitChange(this.formulario.value);
    this.cancelar()
  }
  cancelar(){
    this.bsModalRef.hide()
  }
}
