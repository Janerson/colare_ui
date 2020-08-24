import { ContratoInicial } from '../../../shared/entity/LIC/contrato/contrato-inicial';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GenericDao } from "../../../shared/services/generic/generic-dao";
import { LIC } from '../../../shared/enum-layouts/lic';

@Injectable()
export class ContratoInicialService extends GenericDao<String,ContratoInicial> {
  constructor(protected http: HttpClient) {
    super(http, LIC.CONTRATO_INI);
  }
}
