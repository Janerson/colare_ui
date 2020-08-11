import { Component, OnInit } from "@angular/core";
//import { navItems } from "../../_nav";
import { BaseFormComponent } from "../../shared/ui/base-form/base-form.component";
import { SharedService } from "../../shared/services/shared-service.service";
import { CookieService } from "ngx-cookie-service";
import { AuthenticationService } from "../../auth/authentication.service";
import { MenuService } from "../../shared/services/menu.service";
import { MenuLink } from "../../shared/entity/api/menu-links";
import { FormBuilder, FormGroup } from "@angular/forms";
import { isArray } from "jquery";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.css"],
})
export class DefaultLayoutComponent extends BaseFormComponent
  implements OnInit {
  public sidebarMinimized = false;
  protected navItems: MenuLink[]; //= navItems;
  protected filtered: MenuLink[]; //= navItems;
  formFilter: FormGroup;

  constructor(
    private _sharedService: SharedService,
    private cookieService: CookieService,
    protected authService: AuthenticationService,
    private menuService: MenuService,
    b: FormBuilder
  ) {
    super();
    this.formulario = this.builder.group({});
    this._sharedService.changeEmitted$.subscribe((f) => {
      this.formulario = f;
    });

    this.formFilter = b.group({
      filter: b.control(null, []),
    });
  }

  ngOnInit(): void {
    this.menuService.listar().subscribe((s) => {
      this.navItems = s;
      this.filtered = this.navItems;
    });

    this.formFilter.get("filter").valueChanges.subscribe((str) => {
      this.filtered = this.filtrarMenu(str, this.navItems);
    });
  }

  filtrarMenu(str: string, array: MenuLink[]): MenuLink[] {
    let resultado: MenuLink[] = [];
    array.forEach((el) => {
      let tmp = [];
      let o: MenuLink = {};
      let found = false;

      if (el.name.toLowerCase().indexOf(str.toLowerCase()) > -1) {      
        o = el;
        found = true;
      }

      if (isArray(el.children)) {
        o.name = el.name
        tmp = this.filtrarMenu(str, el.children);
        if (tmp.length) {
          o.children = tmp;
          found = true;
        }
      }
      if (found) {
        resultado.push(o);
      }
    });
    return resultado;

    // return this.navItems.filter((e) => {

    //   return e.name.toLowerCase().indexOf(str.toLowerCase()) > -1;
    // });
  }

  setToken(e) {
    // this.cookieService.set('TCM_TOKEN', e, 0, '/','localhost', true, "Strict");
    //2020-07-30T20:36:50.000Z
    this.cookieService.set("TCM_TOKEN", e);
  }

  adicionado() {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  receiverForm(form) {
    this.formulario = form;
  }
  logout() {
    this.authService.logout();
  }
}
