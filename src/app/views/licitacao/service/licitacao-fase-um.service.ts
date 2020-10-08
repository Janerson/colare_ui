import { HttpClient } from '@angular/common/http';
import { GenericDao } from './../../../shared/services/generic/generic-dao';
import { Injectable } from '@angular/core';
import { LicitacaoFaseUm } from '../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';
import { LIC } from '../../../shared/enum-layouts/lic';

@Injectable({
  providedIn: 'root'
})
export class LicitacaoFaseUmService extends GenericDao<String,LicitacaoFaseUm> {

  constructor(http : HttpClient) {
    super(http, LIC.LICITACAOFASE1);
  }
}
