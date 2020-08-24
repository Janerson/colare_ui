import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {  Passaporte } from "../entity/colare/passaporte";
import { environment } from "../../../environments/environment";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { PassaporteToken } from '../entity/colare/passaporte-token';

@Injectable({
  providedIn: "root",
})
export class PassaporteService {
  constructor(protected http: HttpClient) {}

  options = {
    headers: {
      ignore: "true",
    },
  };

  obterListaDeRespresentacoes(): Observable<Passaporte> {
    return this.http
      .get<Passaporte>(environment.url_representacoes, this.options)
      .pipe(take(1));
  }

  obterToken(cdRepresentacao): Observable<PassaporteToken> {
    return this.http
      .get<PassaporteToken>(
        environment.url_token + cdRepresentacao,
        this.options
      )
      .pipe(take(1));
  }
}
