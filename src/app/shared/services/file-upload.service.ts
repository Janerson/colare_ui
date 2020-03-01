import { Injectable } from '@angular/core';
import { GenericDao } from './generic/generic-dao';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BaseEntity } from './generic/base-entity';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends GenericDao<BaseEntity> {

  constructor(protected http:HttpClient) {
    super(http,'');
  }
}
