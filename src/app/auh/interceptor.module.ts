import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { environment, BASE_URL_TCM } from "../../environments/environment";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // modify request
    if (request.url.startsWith(BASE_URL_TCM)) {
      request = request.clone({
        setHeaders: {
          Authorization: 'CONFIGURAR TOKEN'
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log(" all looks good",event.status);
          }
        },
        error => {
          // http response status code
          console.log("----response----");
          console.error("status code: "+error.status);
          console.error("message: "+error.message);
          console.log("--- end of response---");
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
