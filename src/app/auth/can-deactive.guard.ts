import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { AlertService } from "../shared/services/alert.service";
import { BaseFormComponent } from "../shared/ui/base-form/base-form.component";
import { map } from "jquery";

@Injectable({
  providedIn: "root",
})
export class CanDeactivateGuard implements CanDeactivate<BaseFormComponent> {
  constructor(private alertService: AlertService) {}

  canDeactivate(component: BaseFormComponent): Observable<boolean> {
    return this.checkStatus(component);
  }

  checkStatus(component: BaseFormComponent) {
    if (!component.canDeactivate()) {
      return this.alertService.showConfirm(
        "Formulário contém valores, que não foram salvos, deseja sair sem salvar?",
        "Atenção"
      );
    } else {
      return of(true);
    }
  }
}
