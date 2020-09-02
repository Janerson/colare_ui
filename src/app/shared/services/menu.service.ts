import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { INavData } from '@coreui/angular';

import { GenericDao } from './generic/generic-dao';
import { environment } from '../../../environments/environment';
import { BaseEntity } from '../entity/base-entity';
import { MenuLink } from '../entity/api/menu-links';
import { Page } from '../entity/api/page';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericDao<String,MenuLink> {

  constructor(protected http:HttpClient) { 
    super(http,environment.dominio_menu)
  }

  /**
   * Consulta
   * @param spc 
   */
  consultaSPC(spc:String) {
    return this.http.get<MenuLink>(`${environment.api_url(environment.dominio_menu)}/SPC/${spc}`);
  }

  /**
   * Consulta
   * @param spc 
   */
  listarPaginado() {
    return this.http.get<Page<MenuLink>>(`${environment.api_url(environment.dominio_menu)}/LISTAR`);
  }
}
