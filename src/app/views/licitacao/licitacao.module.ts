import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LicitacaoRoutingModule } from "./licitacao-routing.module";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";


@NgModule({
  declarations: [RegLicitacaoComponent],
  imports: [CommonModule, LicitacaoRoutingModule]
})
export class LicitacaoModule {}
