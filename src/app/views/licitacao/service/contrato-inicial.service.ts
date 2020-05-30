import { ContratoInicial } from './../../../shared/entity/contrato-inicial';
import { ContratoRecisao } from '../../../shared/entity/contrato-recisao';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { GenericDao } from "../../../shared/services/generic/generic-dao";

@Injectable()
export class ContratoInicialService extends GenericDao<ContratoInicial> {
  constructor(protected http: HttpClient) {
    super(http, environment.CONTRATO_INI);
  }
}
