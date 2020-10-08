import { HttpClient } from '@angular/common/http';
import { GenericDao } from './generic/generic-dao';
import { BaseEntity } from '../entity/base-entity';


export class GenericService extends GenericDao<String, Gservice> {

  constructor(http:HttpClient,layout:string) { 
    super(http,layout)
  }
}

class Gservice extends BaseEntity<String>{

}