import { ContratoInicialDetailComponent } from './contrato-inicial/contrato-inicial-detail/contrato-inicial-detail.component';
import { ContratoInicialComponent } from './contrato-inicial/contrato-inicial.component';
import { ContratoInicialService } from "./service/contrato-inicial.service";
import { ContratoRecisaoService } from "./service/contrato-recisao.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { LicitacaoRoutingModule } from "./licitacao-routing.module";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";
import { RegLicitacaoDetailComponent } from "./reg-licitacao/reg-licitacao-detail/reg-licitacao-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { RegLicitacaoService } from "./service/reg-licitacao.service";
import { ContratoRecisaoComponent } from "./contrato-recisao/contrato-recisao.component";
import { ContratoRecisaoDetailComponent } from "./contrato-recisao/contrato-recisao-detail/contrato-recisao-detail.component";
import { LicRetificaPopupComponent } from './lic-retifica-popup/lic-retifica-popup.component';
import { LicRetificaService } from './service/lic-retifica-homolog.service';
import { LicitacaoFaseUmComponent } from './licitacao-fase-um/licitacao-fase-um.component';
import { LicitacaoFaseUmDetailComponent } from './licitacao-fase-um/licitacao-fase-um-detail/licitacao-fase-um-detail.component';
import { LoteComponent } from './lote/lote.component';
import { LotePopupComponent } from './lote/lote-popup/lote-popup.component';
import { ItensLoteComponent } from './lote/itens-lote/itens-lote.component';
import { ItemLoteDetailComponent } from './lote/itens-lote/item-lote-detail/item-lote-detail.component';

@NgModule({
  declarations: [
    RegLicitacaoComponent,
    RegLicitacaoDetailComponent,
    ContratoRecisaoComponent,
    ContratoRecisaoDetailComponent,
    ContratoInicialComponent,
    ContratoInicialDetailComponent,
    LicRetificaPopupComponent,
    LicitacaoFaseUmComponent,
    LicitacaoFaseUmDetailComponent,
    LoteComponent,
    LotePopupComponent,
    ItensLoteComponent,
    ItemLoteDetailComponent
  ],
  imports: [CommonModule, LicitacaoRoutingModule, SharedModule,FormsModule],
  providers: [
    RegLicitacaoService,
    ContratoInicialService,
    ContratoRecisaoService,
    LicRetificaService
  ],
})
export class LicitacaoModule {}
