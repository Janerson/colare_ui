import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthTcm } from "../entity/colare/auth-tcm";
import { environment } from "../../../environments/environment";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { ResponseTokenTCM } from '../entity/colare/token-response-tcm';

@Injectable({
  providedIn: "root",
})
export class TokenTcmService {
  constructor(protected http: HttpClient) {}

  options = {
    headers:{
      "ignore": "true"
    }
  }
  

  obterListaDeRespresentacoes(): Observable<AuthTcm> {
    return this.http.get<AuthTcm>(environment.url_representacoes,this.options).pipe(take(1));
  }

  obterToken(): Observable<ResponseTokenTCM> {
    return this.http.get<ResponseTokenTCM>(environment.url_token).pipe(take(1));
  }
}
