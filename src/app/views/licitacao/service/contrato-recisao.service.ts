import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { GenericDao } from "../../../shared/services/generic/generic-dao";
import { ContratoRecisao } from '../../../shared/entity/LIC/contrato-recisao';

@Injectable()
export class ContratoRecisaoService extends GenericDao<String,ContratoRecisao> {
 
  constructor(protected http: HttpClient) {
    super(http, environment.contrato_ini);
  }
}
