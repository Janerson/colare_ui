import { Page } from './../../../shared/entity/api/page';
import { Tabela } from '../../../shared/entity/colare/tabelas';
import { Injectable } from '@angular/core';
import { GenericDao } from '../../../shared/services/generic/generic-dao';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../shared/enum-layouts/api';
import { environment } from '../../../../environments/environment';
import { MenuLink } from '../../../shared/entity/api/menu-links';

@Injectable({
  providedIn:"root"
})
export class TabelaService extends GenericDao<String,Tabela> {
  
  emit() {
    throw new Error("Method not implemented.");
  }

  constructor(protected http:HttpClient) {
    super(http,API.TABELAS);
  }

  // //LISTAR/URL-START
  // listarUrlIniciandoCom(path : string) {
  //   return this.http.get<Page<Tabela>>(`${environment.api_url(API.DOMINIO_MENU)}/LISTAR/URL-START/${path}`);
  //   // .pipe(tap(() => this._refresh$.next()));
  // }

   /**
   * Consulta Paginada
   * @param page Número da página default 0
   * @param searchBy pesquisar por...
   * @param orderBy Coluna a ser ordenada default seq
   * @param dir Direção ordenamento ASC | DESC default ASC
   */
  listarUrlIniciandoCom(
    path:string,
    page: number = 0,
    searchBy?: string,
    orderBy?: string,
    dir?: string
  ) {
    return this.http.get<Page<MenuLink>>(
      `${environment.api_url(API.DOMINIO_MENU)}/LISTAR/URL-START/${path}?page=${page}&search=${
        searchBy || ""
      }&sort=${orderBy || "seq"}&dir=${dir || "asc"}`
    );
  }
}
