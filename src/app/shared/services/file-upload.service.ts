import { Injectable } from '@angular/core';
import { GenericDao } from './generic/generic-dao';
import { HttpClient } from '@angular/common/http';
import { BaseEntity } from '../entity/base-entity';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends GenericDao<number,BaseEntity<number>> {

  constructor(protected http:HttpClient) {
    super(http,'');
  }
}
