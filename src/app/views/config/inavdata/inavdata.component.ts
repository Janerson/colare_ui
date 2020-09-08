import { Component, OnInit } from "@angular/core";
import { MenuLink } from "../../../shared/entity/api/menu-links";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Page } from "../../../shared/entity/api/page";
import { MenuService } from "../../../shared/services/menu.service";
import { Router } from "@angular/router";
import {
  AlertService,
  AlertTypes,
} from "../../../shared/services/alert.service";
import { switchMap, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Component({
  selector: "app-inavdata",
  templateUrl: "./inavdata.component.html",
  styleUrls: ["./inavdata.component.css"],
})
export class InavdataComponent extends BaseFormComponent implements OnInit {
  submit() {
    throw new Error("Method not implemented.");
  }

  protected page: Page<MenuLink>;

  constructor(
    private service: MenuService,
    private router: Router,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.service.listarPaginado().subscribe((data) => {
      this.page = data;
    });
  }

  editar(uuid: string) {
    this.router.navigate(["configuracao/menu/", uuid]);
  }

  excluir(uuid: string) {
    this.alertService
      .showConfirm(
        "Deseja realmente exluir este Link?",
        "Atenção",
        "SIM",
        "NÃO"
      )
      .pipe(switchMap((value) => value ? this.service.excluir(uuid) : EMPTY))
      .subscribe(() =>
        this.alertService.showAlert(
          AlertTypes.SUCESS,
          "Link excluído com sucesso!",
          "Sucesso"
        )
      );
  }

  pageChanged(event: any): void {
    this.service.paginado(event.page - 1).subscribe((data) => {
      this.page = data;
    });
  }
}
