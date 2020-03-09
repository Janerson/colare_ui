import { Injectable } from '@angular/core';
import { GenericDao } from '../../../shared/services/generic/generic-dao';
import { Dominios } from '../../../shared/entity/dominio';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn:"root"
})
export class DominioService extends GenericDao<Dominios> {
  
  emit() {
    throw new Error("Method not implemented.");
  }

  constructor(protected http:HttpClient) {
    super(http,environment.DOMINIO);
  }
}
