import { Injectable } from '@angular/core';
import { CrudService } from './generic/crud-service';
import { FrequenciaColeta } from '../models/frequencia';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaColetaService extends CrudService<FrequenciaColeta> {

  constructor(http: HttpClient) {
    super(http,"/frequencia-coleta")
   }
}
