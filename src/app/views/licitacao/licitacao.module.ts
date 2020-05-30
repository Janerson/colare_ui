import { ContratoInicialDetailComponent } from './contrato-inicial/contrato-inicial-detail/contrato-inicial-detail.component';
import { ContratoInicialComponent } from './contrato-inicial/contrato-inicial.component';
import { ContratoInicialService } from "./service/contrato-inicial.service";
import { ContratoRecisaoService } from "./service/contrato-recisao.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LicitacaoRoutingModule } from "./licitacao-routing.module";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";
import { RegLicitacaoDetailComponent } from "./reg-licitacao/reg-licitacao-detail/reg-licitacao-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { RegLicitacaoService } from "./service/reg-licitacao.service";
import { ContratoRecisaoComponent } from "./contrato-recisao/contrato-recisao.component";
import { ContratoRecisaoDetailComponent } from "./contrato-recisao/contrato-recisao-detail/contrato-recisao-detail.component";

@NgModule({
  declarations: [
    RegLicitacaoComponent,
    RegLicitacaoDetailComponent,
    ContratoRecisaoComponent,
    ContratoRecisaoDetailComponent,
    ContratoInicialComponent,
    ContratoInicialDetailComponent
  ],
  imports: [CommonModule, LicitacaoRoutingModule, SharedModule],
  providers: [
    RegLicitacaoService,
    ContratoInicialService,
    ContratoRecisaoService,
  ],
})
export class LicitacaoModule {}
