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

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: localStorage.getItem("MY_TOKEN")
      }
    });

    console.log("----request----");

    console.log(request);

    console.log("--- end of request---");

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log(" all looks good");
            // http response status code
            console.log(event.status);
          }
        },
        error => {
          // http response status code
          console.log("----response----");
          console.error("status code:");
          console.error(error.status);
          console.error(error.message);
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
