import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LicitacaoRoutingModule } from "./licitacao-routing.module";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";
import { RegLicitacaoDetailComponent } from "./reg-licitacao/reg-licitacao-detail/reg-licitacao-detail.component";

@NgModule({
  declarations: [RegLicitacaoComponent, RegLicitacaoDetailComponent],
  imports: [CommonModule, LicitacaoRoutingModule]
})
export class LicitacaoModule {}
