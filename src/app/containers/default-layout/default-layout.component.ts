import { Component, OnInit } from "@angular/core";
//import { navItems } from "../../_nav";
import { BaseFormComponent } from "../../shared/ui/base-form/base-form.component";
import { FormService } from "../../shared/services/form.service";
import { CookieService } from "ngx-cookie-service";
import { AuthenticationService } from "../../auth/authentication.service";
import { MenuService } from "../../shared/services/menu.service";
import { MenuLink } from "../../shared/entity/api/menu-links";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.css"],
})
export class DefaultLayoutComponent
  extends BaseFormComponent
  implements OnInit {
  public sidebarMinimized = false;
  protected navItems: MenuLink[] = []; //= navItems;
  protected filtered: MenuLink[] = []; //= navItems;
  formFilter: FormGroup;

  validType = "success";
  pristineType = "success";
  dirtyType = "success";

  constructor(
    private formService: FormService,
    private cookieService: CookieService,
    protected authService: AuthenticationService,
    private menuService: MenuService,
    b: FormBuilder
  ) {
    super();
    this.formulario = this.builder.group({});
    this.formService.changeEmitted$.subscribe((f) => {
      this.formulario = f;
    });

    this.formFilter = b.group({
      filter: b.control(null, []),
    });
  }

  ngOnInit(): void {
    this.menuService.listaPorStatus(true).subscribe((data) => {
      this.lista();
    });

    this.menuService.refresh.subscribe(() => {
      this.lista();
    });

    this.formFilter.get("filter").valueChanges.subscribe((str) => {
      this.filtered = this.filtrarMenu(str, this.navItems);
    });

    if (document.body.classList.contains("modal-open")) {
      document.body.classList.remove("modal-open");
    }
  }

  private lista() {
    this.menuService.listaPorStatus(true).subscribe((data) => {
      this.navItems = data;
      this.filtered = this.navItems;
    });
  }

  submit() {
    throw new Error("Method not implemented.");
  }

  onFormInvalid() {
    throw new Error("Method not implemented.");
  }

  filtrarMenu(str: string, array: MenuLink[]): MenuLink[] {
    let resultado: MenuLink[] = [];
    let title: MenuLink = {};
    array.forEach((el) => {
      let tmp = [];
      let o: MenuLink = {};

      let found = false;

      if (el.title) {
        title = el;
      }

      if (
        el?.name?.toLowerCase().indexOf(str.toLowerCase()) > -1 &&
        !el.title
      ) {
        o = el;
        found = true;
      }

      if (Array.isArray(el.children)) {
        o.name = el.name;
        tmp = this.filtrarMenu(str, el.children);
        if (tmp.length) {
          o.children = tmp;
          found = true;
        }
      }

      if (found) {
        resultado.push(title);
        resultado.push(o);
      }
    });
    return resultado;
  }

  setToken(e) {
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
