import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TipoDeTabelaComponent } from './tipo-de-tabela/tipo-de-tabela.component';
import { TabelaRoutingModule } from './tabelas-routing.module';
import { TabelaService } from './service/tabelas.service';
import { TabelasComponent } from './tabelas/tabelas.component';
import { TabelaResolver } from './tabela.resolver';


@NgModule({
  declarations: [
    TipoDeTabelaComponent,
    TabelasComponent
  ],
  imports: [
    CommonModule,
    TabelaRoutingModule,
    SharedModule
  ],
  providers:[TabelaService, TabelaResolver]
})
export class TabelaModule { }
