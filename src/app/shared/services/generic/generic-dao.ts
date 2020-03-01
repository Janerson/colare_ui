import { HttpClient } from "@angular/common/http";

import { take } from "rxjs/operators";

import { BaseEntity } from "./base-entity";
import { Page } from "./page";
import { environment } from "../../../../environments/environment";

export class GenericDao<T extends BaseEntity> {
  /**
   *
   * @param http : HttpClient
   * @param LAYOUT Tpo de Layout do environment
   */
  constructor(protected http: HttpClient, private LAYOUT: string) {}

  list() {
    return this.http.get<T[]>(`${environment.API_URL}/${this.LAYOUT}/ALL`);
  }

  paged(page?: number) {
    return page !== undefined
      ? this.http.get<Page<T>>(
          `${environment.API_URL}/${this.LAYOUT}/PAGED?page=${page}`
        )
      : this.http.get<Page<T>>(`${environment.API_URL}/${this.LAYOUT}/PAGED`);
  }

  loadByID(id: number) {
    return this.http
      .get<T>(`${environment.API_URL}/${this.LAYOUT}/${id}`)
      .pipe(take(1) /*,tap(console.log)*/);
  }

  save(obj: T) {
    if (obj.seqID) {
      return this.update(obj);
    }
    return this.create(obj);
  }

  private update(obj: T) {
    return this.http
      .put(`${environment.API_URL}/${this.LAYOUT}`, obj)
      .pipe(take(1));
  }
  private create(obj: T) {
    return this.http
      .post(`${environment.API_URL}/${this.LAYOUT}`, obj)
      .pipe(take(1));
  }

  //ENDPOINT´S TCM
  /**
   * Transmitir o Layout para o TCM
   * @param t 
   */
  public postTCM(t: T) {
    return this.http
      .post(`${environment.URL_LAYOUT}/${this.LAYOUT}`, t)
      .pipe(take(1));
  }

  /**
   * Atualizar Layout junto ao TCM
   * @param t 
   * @param id 
   */
  public putTCM(t: T, id: any) {
    return this.http
      .put(`${environment.URL_LAYOUT}/${this.LAYOUT}/${id}`, t)
      .pipe(take(1));
  }

  /**
   * Apagar Layout
   * @param id id do layout enviado
   */
  public deleteTCM(id: any) {
    return this.http.delete(`${environment.URL_LAYOUT}/${this.LAYOUT}/${id}`);
  }

  /**
   * Obter o Layout enviado
   * @param id 
   */
  public getTCM(id: any) {
    this.http.get<T>(`${environment.URL_LAYOUT}/${this.LAYOUT}/${id}`);
  }

  public upload(file: FileList) {
    let formData = new FormData();
    if (file.item(0) != null) {
      formData.set("arquivo", file.item(0));
      return this.http
        .post(`${environment.URL_UPLOAD}`, formData)
        .pipe(take(1));
    }
  }
}
