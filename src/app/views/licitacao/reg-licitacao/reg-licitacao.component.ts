import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { RegLicitacaoService } from "../../../shared/services/licitacao/reg-licitacao.service";
import { RegLicitacao } from "../../../shared/entity/reg-licitacao";
import { Page } from "../../../shared/services/generic/page";

@Component({
  selector: "app-reg-licitacao",
  templateUrl: "./reg-licitacao.component.html"
})
export class RegLicitacaoComponent extends BaseFormComponent implements OnInit {
  protected page: Page<RegLicitacao>;

  constructor(protected service: RegLicitacaoService) {
    super();
  }

  ngOnInit(): void {
    this.service.paged().subscribe(data => {
      this.page = data;
    });
  }

  pageChanged(event: any): void {
    this.service.paged(event.page - 1).subscribe(data => {
      this.page = data;
    });
  }
}
