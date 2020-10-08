import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { GenericDao } from './generic/generic-dao';
import { environment } from "../../../environments/environment";
import { MenuLink } from '../entity/api/menu-links';
import { Page } from '../entity/api/page';
import { API } from '../enum-layouts/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericDao<String,MenuLink> {

  constructor(protected http:HttpClient) { 
    super(http,API.DOMINIO_MENU)
  }

  /**
   * Consulta
   * @param spc 
   */
  consultaSPC(spc:String) {
    return this.http.get<MenuLink>(`${environment.api_url(API.DOMINIO_MENU)}/SPC/${spc}`);
  }

  /**
   * Consulta
   * @param spc 
   */
  listarPaginado() {
    return this.http.get<Page<MenuLink>>(`${environment.api_url(API.DOMINIO_MENU)}/LISTAR`);
  }

  listaAdd(uuid:string, link : MenuLink){
    return this.http.put<MenuLink>(`${environment.api_url(API.DOMINIO_MENU)}/${uuid}/LISTA/ADC`,link);
  }

  
}
