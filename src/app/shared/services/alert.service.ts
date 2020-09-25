import { Injectable, ChangeDetectorRef } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "../ui/alert-modal/alert-modal.component";
import { BaseModalComponent } from "../ui/base-modal/base-modal.component";
import { CustomAlertComponent } from "../ui/custom-alert/custom-alert.component";
import { ToastrService, IndividualConfig } from 'ngx-toastr';

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

  constructor(private bsModalService: BsModalService, private toastr : ToastrService) {}

  showAlert(
    type: AlertTypes,
    message: string,
    title: string,
    footer?: string
  ): BsModalService {
    AlertService.bsModalRef = this.bsModalService.show(CustomAlertComponent, {
      backdrop:true,
      initialState: {
        type: type,
        message: message,
        title: title,
        footer: footer,
      },
    });    
    return this.bsModalService;
  }

  showConfirm(
    message: string,
    title: string,
    okTxt?: string,
    canceltext?: string
  ) {
    AlertService.bsModalRef = this.bsModalService.show(CustomAlertComponent, {
      backdrop:true,
      initialState: {
        type: AlertTypes.CONFIRM,
        message: message,
        title: title,
        isConfirm: true,
        okText: okTxt || "ok",
        cancelText: canceltext || "cancelar",
      },
    });
    
    return (<CustomAlertComponent>AlertService.bsModalRef.content)
      .confirmResult;
  }

  showModal(component: any, options?: ModalOptions): BsModalService {
    Object.assign(options.initialState, { component: component });
    options.animated = true;
    options.backdrop = true
    AlertService.bsModalRef = this.bsModalService.show(
      BaseModalComponent,
      options
    );
    return this.bsModalService;
  }

  showToastr(type:AlertTypes, title:string, message:string){

    switch (type) {
      case AlertTypes.SUCESS:
        this.toastr.success(message,title)
        break;
      case AlertTypes.DANGER:
        this.toastr.error(message,title)
        break;
      case AlertTypes.INFO:
        this.toastr.info(message,title)
        break;    
      case AlertTypes.WARNING:
        this.toastr.warning(message,title)
        break;    
      default:
        this.toastr.show(message,title)
        break;
    }
  }

  hide() {
    if (AlertService.bsModalRef) {
      AlertService.bsModalRef.hide();
    }
  }
}
