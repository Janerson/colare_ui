import { Component, OnInit, Input } from "@angular/core";
import { navItems } from "../../_nav";
import { BaseFormComponent } from "../../shared/ui/base-form/base-form.component";
import { SharedService } from "../../shared/services/shared-service.service";
import { CookieService } from "ngx-cookie-service";
import { AuthenticationService } from "../../auth/authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent extends BaseFormComponent
  implements OnInit {
  public sidebarMinimized = false;
  navItems = navItems;

  constructor(
    private _sharedService: SharedService,
    private cookieService: CookieService,
    protected authService: AuthenticationService
  ) {
    super();
    this.formulario = this.builder.group({});
    this._sharedService.changeEmitted$.subscribe((f) => {
      this.formulario = f;
    });
  }

  ngOnInit(): void {
    /* this.service.list().subscribe(s =>{   
      this.navItems = s
    })*/
  }

  setToken(e) {
    // this.cookieService.set('TCM_TOKEN', e, 0, '/','localhost', true, "Strict");
    //2020-07-30T20:36:50.000Z
    this.cookieService.set("TCM_TOKEN", e);
  }

  adicionado(e) {
    console.log(e);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  receiverForm(form) {
    this.formulario = form;
  }
  logout(e){
    this.authService.logout()
  }
}
