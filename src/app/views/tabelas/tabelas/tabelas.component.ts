import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, interval } from "rxjs";
import { distinctUntilChanged, debounce, switchMap } from "rxjs/operators";
import { MenuLink } from "../../../shared/entity/api/menu-links";
import { Page } from "../../../shared/entity/api/page";
import { Tabela } from "../../../shared/entity/colare/tabelas";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { TabelaService } from "../service/tabelas.service";

@Component({
  selector: "app-tabelas",
  templateUrl: "./tabelas.component.html",
  styleUrls: ["./tabelas.component.css"],
})
export class TabelasComponent extends BaseFormComponent implements OnInit {

  protected page: Page<MenuLink>;
  @ViewChild("file") _file: ElementRef;

  constructor(protected service: TabelaService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.listar();

    this.formulario.addControl("descricao", this.builder.control(null, []));
    this.onValueChanged();
  }

  submit() {
    throw new Error("Method not implemented.");
  }

  onFormInvalid() {
    throw new Error("Method not implemented.");
  }

  private listar() {
    this.service.listarUrlIniciandoCom("TABELA", 0).subscribe((data) => {
      this.page = data;
    });
  }

  pageChanged(event: any): void {
    this.service
      .listarUrlIniciandoCom(
        "TABELA",
        event.page - 1,
        this.formValue("descricao")
      )
      .subscribe((data) => {
        this.page = data;
      });
  }



  acessar(url, nomeTabelaColare) {

    this.router.navigateByUrl(url,{state:{title:nomeTabelaColare}})
  }

  onValueChanged() {
    this.formulario
      .get("descricao")
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounce(() => interval(250)),
        switchMap((value: any) =>
          this.service.listarUrlIniciandoCom("TABELA", 0, value)
        )
      )
      .subscribe(
        (result: any) => {
          this.page = result;
        },
        (error: { message: string }) => console.log(error.message)
      );
  }
}
