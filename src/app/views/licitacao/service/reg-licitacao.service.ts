import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { RegLicitacao } from "../../../shared/entity/LIC/reg-licitacao";
import { GenericDao } from "../../../shared/services/generic/generic-dao";

@Injectable()
export class RegLicitacaoService extends GenericDao<String,RegLicitacao> {
  constructor(protected http: HttpClient) {
    super(http, environment.reg_licitacao);
  }
}
