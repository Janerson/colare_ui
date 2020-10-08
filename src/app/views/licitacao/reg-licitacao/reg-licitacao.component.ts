import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Page } from "../../../shared/entity/api/page";
import { RegLicitacaoService } from '../service/reg-licitacao.service';
import { RegLicitacao } from '../../../shared/entity/LIC/reg_licitacao/reg-licitacao';
import { Router } from '@angular/router';
import { LIC } from '../../../shared/enum-layouts/lic';

@Component({
  selector: "app-reg-licitacao",
  templateUrl: "./reg-licitacao.component.html"
})
export class RegLicitacaoComponent extends BaseFormComponent implements OnInit {

  protected layout = LIC.REG_LICITACAO
  
  submit() {
    throw new Error("Method not implemented.");
  }
  
  protected page: Page<RegLicitacao>;

  constructor(protected service: RegLicitacaoService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.listar()
  }

  editar(uuid: string) {
    this.router.navigate(["/LIC/REG_LICITACAO/", uuid]);
  }

  excluir(uuid){
    this.service.excluir(uuid)
  }

  pageChanged(event: any): void {
    this.service.paginado(event.page - 1).subscribe(data => {
      this.page = data;
    });
  }
  private listar(){
    this.service.paginado().subscribe(data => {
      this.page = data;
    });
  }

  onNotify(){
    this.listar()
  }
}
