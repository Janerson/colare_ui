import { ConfigRoutingModule } from './config-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';



@NgModule({
  declarations: [ConfiguracoesComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
