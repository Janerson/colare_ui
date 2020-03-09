import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DominioRoutingModule } from './dominio-routing.module';
import { DominioService } from './service/dominio.service';
import { SharedModule } from '../../shared/shared.module';
import { TipoDeDominioComponent } from './tipo-de-dominio/tipo-de-dominio.component';


@NgModule({
  declarations: [
    TipoDeDominioComponent
  ],
  imports: [
    CommonModule,
    DominioRoutingModule,
    SharedModule
  ],
  providers:[DominioService]
})
export class DominioModule { }
