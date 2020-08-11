import { Injectable, NgModule } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { tap, retry, catchError } from "rxjs/operators";
import { BASE_URL_TCM } from "../../environments/environment";
import { AlertService } from "../shared/services/alert.service";
import { Erro500, Erro412 } from "../shared/entity/colare/colare-erro";
import { APIError, Erro400 } from '../shared/entity/api/api-error';
import { Erro412Component } from '../shared/ui/erro412/erro412.component';

@Injectable()
export class HttpRequestErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private ngxLoader: NgxUiLoaderService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        this.ngxLoader.stopAll();
        request.url.startsWith(BASE_URL_TCM)
          ? this.hanldeErrorTCM(err)
          : this.hanldeErrorAPI(err);
        return throwError(err);
      })
    );
  }

  private hanldeErrorTCM(error: HttpErrorResponse) {
    let msg = "";
    switch (error.status) {
      case 412:     
        this.alertService.showModal(Erro412Component,{
          class:'modal-lg',
          initialState:{
            data:error["error"]
          }
        })
        break;
      case 400:
      case 401:
      case 500:
        const erro500: Erro500 = error["error"];
        msg = erro500.message;
        this.alertService.showAlertDanger(msg, "ERROR");
        break;
      case 0:
        msg =
          "Problema com o certificado digital! Verique se está instalado e/ou inserido no leitor!";
          this.alertService.showAlertDanger(msg, "ERROR");
        break;
      default:
        msg = error.message;
        this.alertService.showAlertDanger(msg, "ERROR");
        break;
    }
    
  }
  private hanldeErrorAPI(error: HttpErrorResponse) {
    const apiError : APIError = error.error
    //this.alertService.showAlertDanger(apiError.message, "ERROR");

    let msg = "";
    switch (error.status) {   
      case 400:
      case 401:
        this.alertService.showAlertDanger('Usuário e/ou senha inválido!','Erro');
      case 500:     
        break;    
      default:
        msg = error.message;
        this.alertService.showAlertDanger(msg, "ERROR");
        break;
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestErrorInterceptor,
      multi: true,
    },
  ],
})
export class HttpErrorInterceptor {}
