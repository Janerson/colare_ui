import { OnDestroy } from "@angular/core";
import { LicitacaoFaseUm } from "./../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um";
import { LicitacaoFaseUmService } from "./../service/licitacao-fase-um.service";
import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Page } from "../../../shared/entity/api/page";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LIC } from '../../../shared/enum-layouts/lic';

@Component({
  templateUrl: "./licitacao-fase-um.component.html",
  styleUrls: ["./licitacao-fase-um.component.css"],
})
export class LicitacaoFaseUmComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy {
  protected title: String = "";
  private subscriptions = new Subscription();
  protected layout = LIC.LICITACAOFASE1

  submit() {
    throw new Error("Method not implemented.");
  }

  protected page: Page<LicitacaoFaseUm>;

  constructor(
    protected service: LicitacaoFaseUmService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();   
  }

  ngOnInit(): void {
    this.service.paginado().subscribe((data) => {
      this.page = data;
    });
    this.subscriptions.add(
      this.route.data.subscribe((d) => {
        this.title = d.title;
      })
    );
  }

  editar(uuid: string) {
    this.router.navigate(["/LIC/LICITACAOFASEUM/", uuid]);
  }

  pageChanged(event: any): void {
    this.service.paginado(event.page - 1).subscribe((data) => {
      this.page = data;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
