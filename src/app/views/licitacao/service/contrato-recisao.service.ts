import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GenericDao } from "../../../shared/services/generic/generic-dao";
import { ContratoRecisao } from '../../../shared/entity/LIC/contrato/contrato-recisao';
import { LIC } from '../../../shared/enum-layouts/lic';


@Injectable()
export class ContratoRecisaoService extends GenericDao<String,ContratoRecisao> {
 
  constructor(protected http: HttpClient) {
    super(http, LIC.CONTRATO_RESC);
  }
}
