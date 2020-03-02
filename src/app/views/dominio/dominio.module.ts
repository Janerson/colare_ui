import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DominioRoutingModule } from './dominio-routing.module';
import { DominioService } from './service/dominio.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DominioRoutingModule
  ],
  providers:[DominioService]
})
export class DominioModule { }
