import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './generic/crud-service';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends CrudService<Pessoa> {
  constructor(protected http: HttpClient) {
    super(http, 'pessoa');
  }
}
