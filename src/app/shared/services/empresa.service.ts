import { Injectable } from '@angular/core';
import { CrudService } from './generic/crud-service';
import { Empresa } from '../models/empresa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends CrudService<Empresa> {
  constructor(protected http: HttpClient) {
    super(http, 'empresa');
  }
}
