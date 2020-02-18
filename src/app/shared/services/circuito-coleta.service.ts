import { Injectable } from '@angular/core';
import { CrudService } from './generic/crud-service';
import { CircuitoColeta } from '../models/circuito';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CircuitoColetaService extends CrudService<CircuitoColeta> {

  constructor(protected http : HttpClient) { 
    super(http,"/circuito")
  } 
}
