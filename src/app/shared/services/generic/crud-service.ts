import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';

export class CrudService<T> {
  private URL_API = 'http://localhost:8080/api';

  constructor(protected http: HttpClient, private endpoint: string) {}

  lista(): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.URL_API}/${this.endpoint}`)
      .pipe(delay(2000));
  }

  buscaPorID(id: any): Observable<T> {
    return this.http
      .get<T>(`${this.URL_API}/${this.endpoint}/${id}`)
      .pipe(take(1));
  }

  buscaPorNome(nome: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.URL_API}/${this.endpoint}/nome/${nome}`);
  }

  buscaPorIdDuplo(id: any, id2: any): Observable<T> {
    return this.http
      .get<T>(`${this.URL_API}/${this.endpoint}/${id}/${id2}`)
      .pipe(take(1));
  }

  incluir(obj: T): Observable<any> {
    return this.http
      .post(`${this.URL_API}/${this.endpoint}`, obj)
      .pipe(take(1));
  }
}
