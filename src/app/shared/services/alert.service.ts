import { Injectable, ChangeDetectorRef } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "../ui/alert-modal/alert-modal.component";
import { BaseModalComponent } from "../ui/base-modal/base-modal.component";
import { CustomAlertComponent } from "../ui/custom-alert/custom-alert.component";
import { Subscription, combineLatest } from "rxjs";

export enum AlertTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
  CONFIRM = "question",
}

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private static bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) {}

  showAlert(
    type: AlertTypes,
    message: string,
    title: string,
    footer?: string
  ): BsModalService {
    AlertService.bsModalRef = this.bsModalService.show(CustomAlertComponent, {
      initialState: {
        type: type,
        message: message,
        title: title,
        footer: footer,
      },
    });
    return this.bsModalService;
  }

  showConfirm(message: string, title: string, footer?: string) {
    AlertService.bsModalRef = this.bsModalService.show(CustomAlertComponent, {
      initialState: {
        type: AlertTypes.CONFIRM,
        message: message,
        title: title,
        footer: footer,
        isConfirm: true,
        okText: "Ok",
        cancelText: "Cancelar",
      },
    });
    return (<CustomAlertComponent>AlertService.bsModalRef.content)
      .confirmResult;
  }

  showModal(component: any, options?: ModalOptions): BsModalService {
    Object.assign(options.initialState, { component: component });
    options.animated = true;
    AlertService.bsModalRef = this.bsModalService.show(
      BaseModalComponent,
      options
    );
    return this.bsModalService;
  }

  hide() {
    if (AlertService.bsModalRef) {    
      AlertService.bsModalRef.hide();
    }
  }
}
