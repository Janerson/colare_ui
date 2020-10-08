import { Tabela } from '../../../shared/entity/colare/tabelas';
import { Injectable } from '@angular/core';
import { GenericDao } from '../../../shared/services/generic/generic-dao';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../shared/enum-layouts/api';

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
}
