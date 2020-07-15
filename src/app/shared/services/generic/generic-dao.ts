import { HttpClient } from "@angular/common/http";

import { take, tap } from "rxjs/operators";

import { BaseEntity } from "./base-entity";
import { Page } from "./page";
import { environment } from "../../../../environments/environment";
import { Subject } from "rxjs";

export class GenericDao<T extends BaseEntity> {
  private _refresh = new Subject<T>();
  /**
   *
   * @param http : HttpClient
   * @param LAYOUT Tipo de Layout do environment
   */
  constructor(protected http: HttpClient, private LAYOUT: string) {}

  get refresh() {
    return this._refresh;
  }

  list() {
    return this.http.get<T[]>(`${environment.API_URL(this.LAYOUT)}/ALL`);
  }

  paged(page?: number) {
    return page !== undefined
      ? this.http.get<Page<T>>(
          `${environment.API_URL(this.LAYOUT)}/PAGED?page=${page}`
        )
      : this.http.get<Page<T>>(`${environment.API_URL(this.LAYOUT)}/PAGED`);
  }

  /**
   * Consulta Paginada, Tabelas de Dominios
   * @param page Número da página default 0
   * @param tabela Noma tabela de dominio
   */
  pagedDominio(page: number = 0, tabela?: string) {
    return this.http.get<Page<T>>(
      `${environment.API_URL(this.LAYOUT)}/PAGED/${tabela}?page=${page}`
    );
  }

  listDominio(tabela: string, status: boolean = true) {
    return this.http.get<T[]>(`${environment.API_URL(this.LAYOUT)}/ALL/${tabela}/${status}`);
  }

  loadByID(id: number) {
    return this.http
      .get<T>(`${environment.API_URL(this.LAYOUT)}/${id}`)
      .pipe(take(1) /*,tap(console.log)*/);
  }

  save(obj: T) {
    console.log(obj)
    if (obj.seqID) {
      return this.update(obj);
    }
    return this.create(obj);
  }

  private update(obj: T) {
    return this.http.put(`${environment.API_URL(this.LAYOUT)}/${obj.seqID}`, obj).pipe(
      take(1),
      tap(() => this._refresh.next())
    );
  }
  private create(obj: T) {
    return this.http.post(`${environment.API_URL(this.LAYOUT)}`, obj).pipe(
      take(1),
      tap(() => this._refresh.next())
    );
  }

  public uploadAPI(file: FileList, tabela: string) {
    let formData = new FormData();
    if (file.item(0) != null) {
      formData.set("file", file.item(0));
      return this.http
        .post(`${environment.API_URL(this.LAYOUT)}/${tabela}`, formData)
        .pipe(
          take(1),
          tap(() => this._refresh.next())
        );
    }
  }

  //ENDPOINT´S TCM
  /**
   * Transmitir o Layout para o TCM
   * @param t
   */
  public postTCM(t: T) {
    return this.http
      .post(`${environment.URL_LAYOUT(this.LAYOUT)}`, t)
      .pipe(take(1));
  }

  /**
   * Atualizar Layout junto ao TCM
   * @param t
   * @param id
   */
  public putTCM(t: T, id: any) {
    return this.http
      .put(`${environment.URL_LAYOUT(this.LAYOUT)}/${id}`, t)
      .pipe(take(1));
  }

  /**
   * Apagar Layout
   * @param id id do layout enviado
   */
  public deleteTCM(id: any) {
    return this.http.delete(`${environment.URL_LAYOUT(this.LAYOUT)}/${id}`);
  }

  /**
   * Obter o Layout enviado
   * @param id
   */
  public getTCM(id: any) {
    this.http.get<T>(`${environment.URL_LAYOUT(this.LAYOUT)}/${id}`);
  }

  public upload(file: File) {
    let formData = new FormData();
    if (file != null) {
      formData.set("arquivo", file);
      return this.http
        .post(`${environment.URL_UPLOAD}`, formData)
        .pipe(take(1));
    }
  }
}
