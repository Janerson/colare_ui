import { HttpClient } from "@angular/common/http";

import { take, tap } from "rxjs/operators";

import { Page } from "../../entity/api/page";
import { environment } from "../../../../environments/environment";
import { Subject } from "rxjs";
import { BaseEntity } from "../../entity/base-entity";
import { Arquivo, ColareRetorno } from '../../entity/colare/colare-retorno';

export class GenericDao<K, T extends BaseEntity<K>> {
  /**
   * Retorna a quantidade de caracteres {n} da esquerda p/ direita
   * @param str String
   * @param n Qtd de caracteres
   */
  left = (str: any, n: any) => {
    if (n <= 0) return "";
    else if (n > String(str).length) return str;
    else return String(str).substring(0, n);
  };

  /**
   * Retorna a quantidade de caracteres {n} da direita p/ esquerda
   * @param str String
   * @param n Qtd de caracteres
   */
  right = (str: any, n: any) => {
    if (n <= 0) return "";
    else if (n > String(str).length) return str;
    else {
      var iLen = String(str).length;
      return String(str).substring(iLen, iLen - n);
    }
  };

  private removeEmpty = (obj: T) => {
    delete obj.uuid;
    delete obj.arquivo;
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === "object") this.removeEmpty(obj[key]);
      else if (obj[key] == null) delete obj[key];
    });
  };

  private d = new Date();
  private _mes = this.d.getMonth() + 1;
  private _ano = this.d.getUTCFullYear();

  private _refresh$ = new Subject<T>();
  /**
   *
   * @param http : HttpClient
   * @param layout Tipo de layout do environment
   */
  constructor(protected http: HttpClient, private layout: string) {}

  get refresh() {
    return this._refresh$;
  }

  /**
   * Lista os Layout´s
   */
  listar() {
    return this.http.get<T[]>(`${environment.api_url(this.layout)}/ALL`);
  }
  /**
   * Consulta Paginada
   * @param page Número da página default 0
   */
  paginado(page?: number) {
    return page !== undefined
      ? this.http.get<Page<T>>(
          `${environment.api_url(this.layout)}/PAGED?page=${page}`
        )
      : this.http.get<Page<T>>(`${environment.api_url(this.layout)}/PAGED`);
  }

  /**
   * Consulta Paginada, Tabelas de Dominios
   * @param page Número da página default 0
   * @param tabela Nome tabela de dominio
   * @param termSearch termo para pesquisa
   */
  dominioPaginado(page: number = 0, tabela: string, termSearch?:string ) {
    let str = termSearch || ""
    return this.http.get<Page<T>>(
      `${environment.api_url(this.layout)}/PAGED/${tabela}?page=${page}&search=${str}`
    );
  }

  /**
   * Lista dados das tabelas de Domínio
   *@param tabela
   */
  listaDominio(tabela: string, status: boolean) {
    return this.http.get<T[]>(
      `${environment.api_url(this.layout)}/ALL/${tabela}/${status}`
    );
  }
  /**
   * Busca layout pelo UUID
   * @param uuid
   */
  buscarPorUUID(uuid: K) {
    return this.http
      .get<T>(`${environment.api_url(this.layout)}/${uuid}`)
      .pipe(take(1) /*,tap(console.log)*/);
  }

  /**
   * Salva ou atualiza a entidade
   * @param obj Entidade a ser persistida
   */
  salvar(obj: T) {
    if (obj.uuid) {
      return this.atualizar(obj);
    }
    return this.gravar(obj);
  }

  private atualizar(obj: T) {
    return this.http
      .put(`${environment.api_url(this.layout)}/${obj.uuid}`, obj)
      .pipe(
        take(1),
        tap(() => this._refresh$.next())
      );
  }
  private gravar(obj: T) {
    return this.http.post(`${environment.api_url(this.layout)}`, obj).pipe(
      take(1),
      tap(() => this._refresh$.next())
    );
  }

  /**
   * Faz o upload o arquivo de json das tabelas de Domínio
   * @param file Arquivo json da tabela de Domínio
   * @param tabela Nome da tabela de Domínio
   */
  public uploadAPI(file: File, tabela: string) {
    let formData = new FormData();
    if (file != null) {
      formData.set("file", file);
      return this.http
        .post(`${environment.api_url(this.layout)}/${tabela}`, formData)
        .pipe(
          take(1),
          tap(() => this._refresh$.next())
        );
    }
  }

  //==========================ENDPOINT´S TCM=========================
  /**
   * Envia o Layout para o TCM
   * @param t Layout
   */
  public transmitirColare(t: T) {
    const id = t.arquivo?.id;
    const mes = t.arquivo?.mes;
    const ano = t.arquivo?.ano;
    if (t.arquivo?.id) {
      this.removeEmpty(t);
      return this.putColare(t, id, mes, ano);
    } else {
      this.removeEmpty(t);
      return this.postColare(t);
    }
  }

  private postColare(t: T) {
    return this.http
      .post(
        `${environment.url_layout(this.layout)}/${this._mes}/${this._ano}`,
        t
      )
      .pipe(take(1));
  }

  /**
   * Atualizar layout junto ao TCM
   * @param t
   * @param id
   */
  private putColare(t: T, id: any, mes: any, ano: any) {
    return this.http
      .put(
        `${environment.url_layout(this.layout)}/${mes || this._mes}/${
          ano || this._ano
        }/${id}`,
        t
      )
      .pipe(take(1));
  }

  /**
   * Apagar layout no
   * @param id id do layout enviado
   */
  public deleteColare(t: T) {
    return this.http.delete(
      `${environment.url_layout(this.layout)}/${t.arquivo.mes}/${
        t.arquivo.ano
      }/${t.arquivo.id}`
    );
  }

  /**
   * Obter o layout enviado
   * @param l Layout
   */
  public getColare(l: T) {
    return this.http.get<ColareRetorno>(
      `${environment.url_layout(this.layout)}/${l.arquivo.mes}/${
        l.arquivo.ano
      }/${l.arquivo.id}`
    );
  }

  public uploadColare(file: File) {
    let formData = new FormData();
    if (file != null) {
      formData.set("arquivo", file);
      return this.http
        .post(`${environment.url_upload}`, formData)
        .pipe(take(1));
    }
  }

  public obterPdfHomologacaoColare(recibo: string) {
    this.http
      .get(`${environment.url_pdf_homologacao(recibo)}`, {
        headers: {
          Accept: "application/pdf",
        },
        responseType: "blob",
      })
      .subscribe((data) => {
        //let blob = new Blob([data], { type: "application/pdf" });
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement("a");
        link.href = downloadURL;
        link.download = `${recibo}.pdf`;
        link.click();
      });
  }

  /**
   * Homologa o envio do layout
   * @param t Layout
   * @param arquivo Arquivo de homologação assinado digitalmente
   */
  public homologarEnvioColare(layout: T, arquivo: File) {
    var formData = new FormData();
    formData.set("arquivo", arquivo);
    return this.http.put(
      `${environment.url_homologa_envio(
        this.layout,
        layout.arquivo.mes,
        layout.arquivo.ano,
        layout.arquivo.id
      )}`,
      formData
    );
  }
}
