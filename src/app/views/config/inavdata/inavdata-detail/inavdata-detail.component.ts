import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterContentInit,
} from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HelperService } from "../../../../shared/services/helper.service";
import { MenuService } from "../../../../shared/services/menu.service";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { FormService } from "../../../../shared/services/form.service";
import { MenuLink } from "../../../../shared/entity/api/menu-links";
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import {
  AlertService,
  AlertTypes,
} from "../../../../shared/services/alert.service";
import { ChildrenPopupComponent } from "./children-popup/children-popup.component";
import { ModalService } from "../../../../shared/services/modal.service";
import { Icon } from 'ngx-icon-picker';

@Component({
  selector: "app-inavdata-detail",
  templateUrl: "./inavdata-detail.component.html",
  styleUrls: ["./inavdata-detail.component.css"],
})
export class InavdataDetailComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  private subscriptionRoute: Subscription;
  private menuSubject: Subject<MenuLink>;
  protected isTitle = false;
  protected uuid: String;
  icon = new FormControl();

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
    this.menuSubject = new Subject();
  }

  ngOnInit(): void {
    this.formService.emitChange(this.formulario);
    this.criarFormulario();
    this.menuSubject.subscribe((value) => {
      this.preencherFormulario(value);
    });

    this.subscriptionRoute = this.route.paramMap.subscribe((param) => {
      this.uuid = param.get("id");
      if (this.helper.isUUID(this.uuid)) {
        this.menuService.buscarPorUUID(this.uuid).subscribe((value) => {
          this.menuSubject.next(value);
        });
      }
    });    
  }

  submit() {
    this.menuService.salvar(this.formValue()).subscribe(() => {
      this.alertService
        .showAlert(AlertTypes.SUCESS, "Dados gravados com sucesso!", "Sucesso")
        .onHidden.subscribe(() => {
          this.voltar();
        });
    });
  }

  criarFormulario() {
    this.removeControl("arquivo");
    this.adicionaControl("name", this.builder.control(null, []));
    this.adicionaControl("url", this.builder.control(null, []));
    this.adicionaControl("icon", this.builder.control(null,[]));
    this.adicionaControl("title", this.builder.control(false, []));
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

  preencherFormulario(menu: MenuLink) {
    this.atualizaFormulario(menu);
    if (menu.children) menu.children.forEach((m) => this.addChildren(m));
  }

  addChildren(m: MenuLink) {
    const children = this.formValue("children", true) as FormArray;
    const fg = this.builder.group({
      uuid: this.builder.control(m.uuid),
      icon: this.builder.control(m.icon),
      name: this.builder.control(m.name),
      url: this.builder.control(m.url),
    });
    children.push(fg);
  }

  removerSublink(index: number) {
    this.alertService
      .showConfirm(
        "Tem certeza que deseja excluir este sub-link?",
        "Atenção",
        "SIM",
        "NÃO"
      )
      .subscribe((value) => {
        if (value) {
          const children = this.formValue("children", true) as FormArray;
          this.menuService.excluir(children.at(index).get("uuid").value).subscribe()
          children.removeAt(index);
        }
      });
  }


  popupAddChildren(data?: Object, index?:number) {
    
    const subs = this.modalService.changeEmitted$.subscribe((value : MenuLink) => {      
      if(index){
        this.getChildren(index).patchValue(value)
      }else{
        this.addChildren(value);
      }
    });

    this.alertService
      .showModal(ChildrenPopupComponent, {
        class: "modal-lg",
        initialState: {
          title: "Adicionar sub-link",
          data: data,
        },
      })
      .onHidden.subscribe((e) => {
        subs.unsubscribe();
        //this.submit()
         this.menuService.salvar(this.formValue()).subscribe();
      });
  }

  onPickerIcon(event) {
    this.formValue("icon", true).setValue(event);
  }

  getChildren(index){
    const children = this.formValue("children", true) as FormArray;
    return children.at(index)
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
    this.router.navigate(["configuracao/menu"]);
  }

  ngOnDestroy(): void {
    this.subscriptionRoute.unsubscribe();
    this.menuSubject.unsubscribe();
    this.formService.emitChange({});
  }
}
