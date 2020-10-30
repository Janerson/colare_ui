import { AuthenticationService } from "./authentication.service";
import {
  ErrorHandler,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
} from "@angular/core";
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
import { catchError, retry } from "rxjs/operators";
import { BASE_URL_TCM } from "../../environments/environment";
import { AlertService, AlertTypes } from "../shared/services/alert.service";
import { Erro500 } from "../shared/entity/colare/colare-erro";
import { APIError } from "../shared/entity/api/api-error";
import { Erro412Component } from "../shared/ui/erro412/erro412.component";
//import * as Rollbar from 'rollbar';

@Injectable()
export class HttpRequestErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private ngxLoader: NgxUiLoaderService,
    private auth: AuthenticationService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        request.url.startsWith(BASE_URL_TCM)
          ? this.hanldeErrorTCM(err)
          : this.hanldeErrorAPI(err);
        return throwError(err);
      })
    );
  }

  private hanldeErrorTCM(error: HttpErrorResponse) {
    this.alertService.hide();
    this.ngxLoader.stop();
    let msg = "";
    switch (error.status) {
      case 412:
        this.alertService.showModal(Erro412Component, {
          class: "modal-lg",
          initialState: {
            data: error["error"],
          },
        });
        break;
      case 400:
      case 401:
      case 500:
        const erro500: Erro500 = error["error"];
        msg = erro500.message;
        this.alertService.showAlert(AlertTypes.DANGER, msg, "ERROR");
        break;
      case 0:
        msg =
          "Problema com o certificado digital! Verique se está instalado e/ou inserido no leitor!";
        this.alertService.showAlert(AlertTypes.DANGER, msg, "ERROR");
        break;
      default:
        msg = error.message;
        this.alertService.showAlert(AlertTypes.DANGER, msg, "ERROR");
        break;
    }
  }

  private hanldeErrorAPI(error: HttpErrorResponse) {
    this.alertService.hide();
    this.ngxLoader.stop();
    const apiError: APIError = error.error;
    //this.alertService.showAlertDanger(apiError.message, "ERROR");

    let msg = "";
    switch (error.status) {
      case 400:
      case 401:
        if (this.auth.token) {
          console.log("Error capturado..", error.message);
          this.alertService.showToastr(
            AlertTypes.DANGER,
            "ERROR",
            "Usuário e/ou senha inválido!"
          );
        }
        break;
      case 405:
        this.alertService.showToastr(
          AlertTypes.DANGER,
          "ERROR",
          apiError.errors[0]
        );
        break;
      case 412:
        apiError.errors.forEach((e, i) => {
          this.alertService.showToastr(AlertTypes.DANGER, "ERROR", e, {
            timeOut: 5000 + i * 1000,
            tapToDismiss: true,
          });
        });
        break;
      case 415:
        this.alertService.showToastr(
          AlertTypes.DANGER,
          "ERROR",
          apiError.message
        );
        break;
      case 500:
        this.alertService.showToastr(
          AlertTypes.DANGER,
          "ERROR",
          apiError.message
        );
        break;
      default:
        if (this.auth.token) {
          msg = error.message;
          this.alertService.showToastr(AlertTypes.DANGER, msg, "ERROR");
        }
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
    // { provide: ErrorHandler, useClass: RollbarErrorHandler },
    // { provide: RollbarService, useFactory: rollbarFactory }
  ],
})
export class HttpErrorInterceptor {}
