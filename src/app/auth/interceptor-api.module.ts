import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
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
import { BASE_URL_API } from "../../environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private cookieService: CookieService
  ) {}
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(!request.url.match("page=[1-9]")){
      this.ngxLoader.start();
    }
   // this.ngxLoader.start();
    // modify request
    if (request.url.startsWith(BASE_URL_API) && !request.url.endsWith('api/oauth/token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookieService.get("API_TOKEN")}`,
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
export class InterceptorApi {}
