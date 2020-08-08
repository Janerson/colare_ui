import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../ui/alert-modal/alert-modal.component';
import { BaseModalComponent } from '../ui/base-modal/base-modal.component';

export enum AlertTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private modalService: BsModalService) {}

  private showAlert(
    message: string,
    title?: string,
    footer?: string,
    type?: AlertTypes
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    bsModalRef.content.title = title;
    bsModalRef.content.footer = footer;
  }

  private modal(options:ModalOptions) {
    const bsModalRef: BsModalRef = this.modalService.show(BaseModalComponent,options);
  }
  
  showAlertDanger(message: string, title?: string, footer?: string) {
    this.showAlert(message, title, footer, AlertTypes.DANGER);
  }

  showAlertSucess(message: string, title?: string, footer?: string) {
    this.showAlert(message, title, footer, AlertTypes.SUCESS);
  }

  showAlertInfo(message: string, title?: string, footer?: string) {
    this.showAlert(message, title, footer, AlertTypes.INFO);
  }

  showAlertWarning(message: string, title?: string, footer?: string) {
    this.showAlert(message, title, footer, AlertTypes.WARNING);
  }

  showModal(component:any, options?: ModalOptions){
    Object.assign(options.initialState,{component : component})
    this.modal(options)
  }
  
}
