import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GenericDao } from "../../../shared/services/generic/generic-dao";
import { LIC } from '../../../shared/enum-layouts/lic';
import { LicRetificaHomolog } from '../../../shared/entity/LIC/retificacao/lic-retificacao';
import { environment } from '../../../../environments/environment';
import { take, tap } from 'rxjs/operators';


@Injectable()
export class LicRetificaService extends GenericDao<String,LicRetificaHomolog> {
  constructor(protected http: HttpClient) {
    super(http, LIC.RETIFICAHOMOLOG);
  }

  getPorIdProcedimentoEStatusEnvio(idProcedimento:number, statusEnvio:string) {
    return this.http
      .get<LicRetificaHomolog>(`${environment.api_url(LIC.RETIFICAHOMOLOG)}/${idProcedimento}/${statusEnvio}`)
      .pipe(take(1));
  }

}
