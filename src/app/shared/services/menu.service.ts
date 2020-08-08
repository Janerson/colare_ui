import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { INavData } from '@coreui/angular';

import { BaseEntity } from './generic/base-entity';
import { GenericDao } from './generic/generic-dao';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericDao<number,BaseEntity<number>> {

  constructor(protected http:HttpClient) { 
    super(http,`${environment.API_URL}`)
  }
}
