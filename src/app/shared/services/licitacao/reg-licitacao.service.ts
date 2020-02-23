import { Injectable } from '@angular/core';
import { GenericDao } from '../generic/generic-dao';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RegLicitacao } from '../../entity/reg-licitacao';


@Injectable({
  providedIn: 'root'
})
export class RegLicitacaoService extends GenericDao<RegLicitacao> {

  constructor(protected http:HttpClient) {
    super(http,environment.API_URL(environment.REG_LICITACAO));
  }
}
