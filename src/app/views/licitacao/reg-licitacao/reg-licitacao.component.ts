import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Page } from "../../../shared/entity/api/page";
import { RegLicitacaoService } from '../service/reg-licitacao.service';
import { RegLicitacao } from '../../../shared/entity/LIC/reg_licitacao/reg-licitacao';
import { Router } from '@angular/router';

@Component({
  selector: "app-reg-licitacao",
  templateUrl: "./reg-licitacao.component.html"
})
export class RegLicitacaoComponent extends BaseFormComponent implements OnInit {
  
  submit() {
    throw new Error("Method not implemented.");
  }
  
  protected page: Page<RegLicitacao>;

  constructor(protected service: RegLicitacaoService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.service.paginado().subscribe(data => {
      this.page = data;
    });
  }

  editar(uuid: string) {
    this.router.navigate(["/LIC/REG_LICITACAO/", uuid]);
  }


  pageChanged(event: any): void {
    this.service.paginado(event.page - 1).subscribe(data => {
      this.page = data;
    });
  }
}
