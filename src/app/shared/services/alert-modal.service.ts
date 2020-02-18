import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertModalComponent } from '../ui/alert-modal/alert-modal.component';

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
export class AlertModalService {
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

  showAlertDanger(message: string, title?: string, footer?: string) {
    this.showAlert(message, title, footer, AlertTypes.DANGER);
  }
  showAlertSucess(message: string, title?: string, footer?: string) {
    this.showAlert(message, title, footer, AlertTypes.SUCESS);
  }
  
}
