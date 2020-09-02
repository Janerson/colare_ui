import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracaoRoutingModule } from './configuracao-routing.module';
import { InavdataComponent } from './inavdata/inavdata.component';
import { SharedModule } from '../../shared/shared.module';
import { InavdataDetailComponent } from './inavdata/inavdata-detail/inavdata-detail.component';
import { ChildrenPopupComponent } from './inavdata/inavdata-detail/children-popup/children-popup.component';


@NgModule({
  declarations: [InavdataComponent, InavdataDetailComponent, ChildrenPopupComponent],
  imports: [
    CommonModule,
    ConfiguracaoRoutingModule,
    SharedModule
  ]
})
export class ConfiguracaoModule { }
