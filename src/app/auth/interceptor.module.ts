import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { environment, BASE_URL_TCM } from "../../environments/environment";
import { AlertService } from '../shared/services/alert.service';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_TCM = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dhZG9Db21DZXJ0aWZpY2Fkb0RpZ2l0YWwiOnRydWUsInN1YiI6IjI0MzI5NTUwMTMwIiwiYXVkaWVuY2UiOiJ3ZWIiLCJjcmVhdGVkIjoxNTkxMDkzNzQ5LCJyZXByZXNlbnRhY2FvIjo4NTUsImV4cCI6MTU5MTE1MzE5OX0.qg2d0CL3WV4Ne3AlbtujW336-3ocCfrkOPt9DUrO2is7QAERqBdPQBVz7ErmScObwYL-3ji99Gfs24GI7yajxQ"

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private alertService:AlertService, 
    private ngxLoader: NgxUiLoaderService,
    private cookieService: CookieService){}
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ngxLoader.start();
    // modify request
    if (request.url.startsWith(BASE_URL_TCM)) {
      request = request.clone({
        setHeaders: {
          Authorization: TOKEN_TCM//this.cookieService.get('TCM_TOKEN')
        }
      });
    }else{
      request = request.clone({
        setHeaders: {
          Authorization: this.cookieService.get('API_TOKEN')
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {  
            console.log(request)          
            console.log(HttpResponse)          
            this.ngxLoader.stop();
          }
        },
        error => {
          // http response status code
          this.ngxLoader.stop();          
          this.alertService.showAlertDanger(error.error.message,"ERRO")          
        }
      )
    );
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class Interceptor {}
