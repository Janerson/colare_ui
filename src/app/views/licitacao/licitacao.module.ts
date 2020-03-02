import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LicitacaoRoutingModule } from "./licitacao-routing.module";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";
import { RegLicitacaoDetailComponent } from "./reg-licitacao/reg-licitacao-detail/reg-licitacao-detail.component";
import { SharedModule } from '../../shared/shared.module';
import { RegLicitacaoService } from './service/reg-licitacao.service';

@NgModule({
  declarations: [RegLicitacaoComponent, RegLicitacaoDetailComponent],
  imports: [CommonModule, LicitacaoRoutingModule, SharedModule],
  providers:[RegLicitacaoService]
})
export class LicitacaoModule {}
