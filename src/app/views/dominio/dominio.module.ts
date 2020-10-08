import { MenuPopupComponent } from './menu/menu-detail/menu-popup/menu-popup.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  DominioRoutingModule } from './dominio-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [MenuComponent, MenuDetailComponent, MenuPopupComponent],
  imports: [
    CommonModule,
    DominioRoutingModule,
    SharedModule
  ]
})
export class DominioModule { }
