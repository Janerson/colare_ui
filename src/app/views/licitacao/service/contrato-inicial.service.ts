import { ContratoInicial } from '../../../shared/entity/LIC/contrato-inicial';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { GenericDao } from "../../../shared/services/generic/generic-dao";

@Injectable()
export class ContratoInicialService extends GenericDao<String,ContratoInicial> {
  constructor(protected http: HttpClient) {
    super(http, environment.contrato_ini);
  }
}
