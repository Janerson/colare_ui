import { Component, OnInit } from "@angular/core";
import { MenuLink } from "../../../shared/entity/api/menu-links";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Page } from "../../../shared/entity/api/page";
import { MenuService } from "../../../shared/services/menu.service";
import { API } from '../../../shared/enum-layouts/api';

@Component({
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent extends BaseFormComponent implements OnInit {

  protected layout = API.DOMINIO_MENU;

  protected page: Page<MenuLink>;

  constructor(
    private service: MenuService) {
    super();
  }

  ngOnInit(): void {
    this.service.listarPaginado().subscribe((data) => {
      this.page = data;
    });
    this.service.refresh.subscribe(() => {
      this.service.listarPaginado().subscribe((data) => {
        this.page = data;
      });
    });
  }

  onNotify() {
    this.service.refresh.next()
  }

  pageChanged(event: any): void {
    this.service.paginado(event.page - 1).subscribe((data) => {
      this.page = data;
    });
  }
  onFormInvalid() {
    throw new Error('Method not implemented.');
  }
  submit() {
    throw new Error("Method not implemented.");
  }
}
