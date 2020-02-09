import { HttpClient } from "@angular/common/http";

import { delay, tap, take } from "rxjs/operators";

import { BaseEntity } from "./base-entity";

export class GenericDao<T extends BaseEntity> {
  constructor(protected http: HttpClient, private API_URL: string) {}

  list() {
    return this.http.get<T[]>(this.API_URL)//pipe(delay(2000), tap(console.log));
  }

  loadByID(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }
  create(obj: T) {
    return this.http.post(`${this.API_URL}`, obj).pipe(take(1));
  }
  update(obj: T) {
    return this.http.put(`${this.API_URL}`, obj).pipe(take(1));
  }
}
