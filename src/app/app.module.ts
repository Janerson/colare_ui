import { NgxUiLoaderModule, SPINNER, NgxUiLoaderConfig } from "ngx-ui-loader";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule, enableProdMode, APP_INITIALIZER, ErrorHandler, Inject, Injectable, InjectionToken } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "AGUARDE...",
  fgsColor: "red",
  pbColor: "red",
  fgsPosition: "center-center",
  //fgsSize: 80,
  fgsType: SPINNER.squareJellyBox,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { SharedModule } from "./shared/shared.module";
import { CookieService } from "ngx-cookie-service";

import { InterceptorApi } from "./auth/interceptor-api.module";
import { InterceptorTCM } from "./auth/interceptor-tcm.module";
import { HttpErrorInterceptor } from "./auth/http-error-interceptor.module";
import { appInitializer } from "./auth/app.initialize";
import { AuthenticationService } from "./auth/authentication.service";
import { BsModalService, ModalBackdropComponent, ModalModule } from "ngx-bootstrap/modal";
import * as Rollbar from 'rollbar';

enableProdMode();
// const rollbarConfig = {
//   accessToken: '28bfc91ad6ef47e28a628d53c70dec01',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// };

// @Injectable()
// export class RollbarErrorHandler implements ErrorHandler {
//   constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

//   handleError(err:any) : void {
//     this.rollbar.error(err.originalError || err);
//   }
// }

// export function rollbarFactory() {
//     return new Rollbar(rollbarConfig);
// }

// export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule.forRoot(),
    InterceptorApi,
    InterceptorTCM,
    HttpErrorInterceptor,
    PerfectScrollbarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),

    //NgxUiLoaderRouterModule.forRoot({showForeground:false}),
    //NgxUiLoaderHttpModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
  ],  
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    BsModalService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    CookieService,
    // { provide: ErrorHandler, useClass: RollbarErrorHandler },
    // { provide: RollbarService, useFactory: rollbarFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
