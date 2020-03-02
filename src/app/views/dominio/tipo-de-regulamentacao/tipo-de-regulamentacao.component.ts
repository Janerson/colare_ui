import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from '../../../shared/ui/base-form/base-form.component';
import { Dominio } from '../../../shared/entity/dominio';
import { Page } from '../../../shared/services/generic/page';
import { RegLicitacaoService } from '../../../shared/services/licitacao/reg-licitacao.service';


@Component({
  selector: "app-tipo-de-regulamentacao",
  templateUrl: "./tipo-de-regulamentacao.component.html"
})
export class TipoDeRegulamentacaoComponent extends BaseFormComponent implements OnInit {
 
  submit() {
    throw new Error("Method not implemented.");
  }
  
  protected page: Page<Dominio>;

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
