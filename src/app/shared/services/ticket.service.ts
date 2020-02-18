import { Injectable } from '@angular/core';
import { CrudService } from './generic/crud-service';
import { Ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class TicketService extends CrudService<Ticket> {

  constructor(protected http : HttpClient) { 
    super(http,"ticket")
  }
}
