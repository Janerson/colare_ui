import { Injectable, NgModule } from "@angular/core";
import { Observable, EMPTY } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { BASE_URL_TCM } from "../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { AlertService, AlertTypes } from "../shared/services/alert.service";
import { PassaporteComponent } from "../shared/ui/passaporte/passaporte.component";
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
   
  constructor(
    private alertService: AlertService,
    private ngxLoader: NgxUiLoaderService,
    private cookieService: CookieService    
  ) {}
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.match("page=")) {
      this.ngxLoader.start();
    }
    //this.ngxLoader.start();
    // modify request
    //&& request.headers.get('ignore')
    if (
      request.url.startsWith(BASE_URL_TCM) &&
      !request.headers.get("ignore")
    ) {
      if (!this.cookieService.get("TCM_TOKEN") || helper.isTokenExpired(this.cookieService.get("TCM_TOKEN"))) {
        this.alertService.hide()
        this.ngxLoader.stop(); 
        
        const sub = this.alertService.showAlert(AlertTypes.INFO,"Faça o Login com seu certificado digital e tente novamente!","Atenção")
        .onHidden.subscribe(() => {
          this.showLogin()
          sub.unsubscribe()
        });

        return EMPTY;

      }

      request = request.clone({
        setHeaders: {
          Authorization: this.cookieService.get("TCM_TOKEN"),
        },
      });
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.ngxLoader.stop();
        }
      })
    );
  }
  showLogin() {    
    const initialState = {
      title: "Obter Token - Colare",
    };
    this.alertService.showModal(PassaporteComponent, {
      class: "modal-md",
      initialState,
    });
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorTCM {}
