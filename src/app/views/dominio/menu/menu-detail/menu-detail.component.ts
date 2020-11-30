import { switchMap } from "rxjs/operators";
import { MenuPopupComponent } from "./menu-popup/menu-popup.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Subject, EMPTY } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HelperService } from "../../../../shared/services/helper.service";
import { MenuService } from "../../../../shared/services/menu.service";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { FormService } from "../../../../shared/services/form.service";
import { MenuLink } from "../../../../shared/entity/api/menu-links";
import { FormControl, FormArray, Validators } from "@angular/forms";
import {
  AlertService,
  AlertTypes,
} from "../../../../shared/services/alert.service";
import { ModalService } from "../../../../shared/services/modal.service";
import { API } from "../../../../shared/enum-layouts/api";

@Component({
  templateUrl: "./menu-detail.component.html",
  styleUrls: ["./menu-detail.component.css"],
})
export class MenuDetailComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  protected isTitle = false;
  protected uuid: String;
  protected disableDelBtn = true;
  icon = new FormControl();

  protected layout = API.DOMINIO_MENU;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
    private menuService: MenuService,
    private formService: FormService,
    private alertService: AlertService,
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formService.emitChange(this.formulario);
    this.criarFormulario();
    this.subscriptions.add(
      this.route.paramMap.subscribe((param) => {
        this.uuid = param.get("id");
        if (this.helper.isUUID(this.uuid)) {
          this.getMenu();
        }
      })
    );
  }

  private getMenu() {
    this.formulario.reset;
    this.menuService.buscarPorUUID(this.uuid).subscribe((value) => {
      this.children.clear();
      this.atualizaFormulario(value);
      if (value.children) value.children.forEach((m) => this.addChildren(m));
      this.disableDelBtn = false;
    });
  }

  submit() {
    this.menuService.salvar(this.formValue()).subscribe((data) => {
      this.uuid = data.uuid;
      this.alertService.showToastr(
        AlertTypes.SUCESS,
        "Sucesso",
        "Dados gravados com sucesso!"
      );
      //this.atualizaFormulario(value);
      this.getMenu();
    });
  }

  onFormInvalid() {
    this.alertService.showToastr(
      AlertTypes.DANGER,
      "ERROR",
      "Verifique os erros e tente novamente."
    );
  }

  excluir() {
    this.alertService
      .showConfirm(
        "Deseja realmente exluir este registro?",
        "Atenção",
        "SIM",
        "NÃO"
      )
      .pipe(
        switchMap((value) =>
          value ? this.menuService.excluir(this.formValue("uuid")) : EMPTY
        )
      )
      .subscribe(() => {
        this.alertService.showToastr(
          AlertTypes.SUCESS,
          "Sucesso",
          "Registro excluído com sucesso!"
        );
        this.voltar();
      });
  }

  criarFormulario() {
    this.removeControl("arquivo");
    this.adicionaControl(
      "name",
      this.builder.control(null, [Validators.required])
    );
    this.adicionaControl("url", this.builder.control(null, []));
    this.adicionaControl("icon", this.builder.control(null, []));
    this.adicionaControl("title", this.builder.control(false, []));
    this.adicionaControl("show", this.builder.control(true, []));
    this.adicionaControl(
      "badge",
      this.builder.group({
        uuid: this.builder.control(null),
        text: this.builder.control(null),
        variant: this.builder.control(null),
        class: this.builder.control(null),
      })
    );
    this.adicionaControl("children", this.builder.array([]));
    this.adicionaControl("variant", this.builder.control(null, []));
    this.adicionaControl("divider", this.builder.control(null, []));
    this.adicionaControl("class", this.builder.control(null, []));
  }

  addChildren(m: MenuLink) {
    const fg = this.builder.group({
      uuid: this.builder.control(m.uuid),
      icon: this.builder.control(m.icon),
      name: this.builder.control(m.name),
      url: this.builder.control(m.url),
      nomeTabelaColare: this.builder.control(m.nomeTabelaColare),
    });
    this.children.push(fg);
  }

  excluirSubLink(index: number) {
    this.children.removeAt(index);
    this.menuService.refresh.next();
  }

  get children() {
    return this.formValue("children", true) as FormArray;
  }

  popupAddChildren(data?: Object, index?: number) {
    let obj = {
      uuid: this.formValue("uuid"),
      menu: data,
    };

    if (!this.formValue("uuid")) {
      this.alertService.showAlert(
        AlertTypes.WARNING,
        "Salve o MENU para poder utilizar esta ação",
        "Atenção"
      );
      return;
    }

    this.alertService
      .showModal(MenuPopupComponent, {
        class: "modal-lg",
        initialState: {
          title: "Adicionar sub-menu",
          data: obj,
        },
      })
      .onHidden.subscribe(() => {
        this.getMenu();
        this.menuService.refresh.next();
      });
  }

  onPickerIcon(event) {
    this.formValue("icon", true).setValue(event);
  }

  addOrRemoveChildren() {
    this.isTitle = this.formValue("title");
    if (this.isTitle) {
      if (this.formValue("children", true)) this.removeControl("children");
    } else {
      this.adicionaControl("children", this.builder.array([]));
    }
  }

  voltar() {
    this.router.navigate(["DOMINIO/MENU"]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.formService.emitChange({});
  }
}
