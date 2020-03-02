import { Injectable } from '@angular/core';
import { GenericDao } from '../../../shared/services/generic/generic-dao';
import { Dominio } from '../../../shared/entity/dominio';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DominioService extends GenericDao<Dominio> {

  constructor(protected http:HttpClient) {
    super(http,"");
  }
}
