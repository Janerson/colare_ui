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
          Authorization: this.cookieService.get('TCM_TOKEN')
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
