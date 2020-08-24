import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegLicitacao } from "../../../shared/entity/LIC/reg_licitacao/reg-licitacao";
import { GenericDao } from "../../../shared/services/generic/generic-dao";
import { LIC } from '../../../shared/enum-layouts/lic';


@Injectable()
export class RegLicitacaoService extends GenericDao<String,RegLicitacao> {
  constructor(protected http: HttpClient) {
    super(http, LIC.REG_LICITACAO);
  }
}
