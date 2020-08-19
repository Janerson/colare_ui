import { Injectable, ChangeDetectorRef } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "../ui/alert-modal/alert-modal.component";
import { BaseModalComponent } from "../ui/base-modal/base-modal.component";
import { CustomAlertComponent } from "../ui/custom-alert/custom-alert.component";
import { Subscription, combineLatest } from 'rxjs';

export enum AlertTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
}

@Injectable({
  providedIn: "root",
})
export class AlertService {
  subscriptions: Subscription[] = [];
  constructor(private bsModalService: BsModalService) {}

  private showAlert(
    message: string,
    title?: string,
    footer?: string,
    type?: AlertTypes   
  ) {     

    const bsModalRef: BsModalRef = this.bsModalService.show(
      CustomAlertComponent,
      {
        class: "my-modal",
      }
    );
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    bsModalRef.content.title = title;
    bsModalRef.content.footer = footer;
  }

  private modal(options: ModalOptions) {
    const bsModalRef: BsModalRef = this.bsModalService.show(
      BaseModalComponent,
      options
    );
  }

  showAlertDanger(message: string, title?: string,footer?: string,onShown?: any,onHidden?: any ) :  BsModalService {
    this.showAlert(message,title,footer,AlertTypes.DANGER);
    return this.bsModalService
  }

  showAlertSucess(message: string,title?: string,footer?: string) : BsModalService{
    this.showAlert(message,title,footer,AlertTypes.SUCESS);
    return this.bsModalService
  }

  showAlertInfo(message: string,title?: string,footer?: string) : BsModalService {
    this.showAlert(message, title, footer, AlertTypes.INFO);
    return this.bsModalService
  }

  showAlertWarning(message: string,title?: string,footer?: string): BsModalService {
    this.showAlert(message,title,footer,AlertTypes.WARNING);
    return this.bsModalService
  }

  showModal(component: any, options?: ModalOptions) : BsModalService {
    Object.assign(options.initialState, { component: component });
    options.animated = true;
    this.modal(options);
    return this.bsModalService
  }

}
