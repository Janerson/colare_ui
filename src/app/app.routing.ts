import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { AuthGuard } from "./auth/auth-guard.guard";
import { CanDeactivateGuard } from './auth/can-deactive.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "404",
    component: P404Component,
    //canActivate:[AuthGuard],
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },  
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Home",
    },
    children: [
      {
        path: "LIC",      
        loadChildren: () =>
          import("./views/licitacao/licitacao.module").then(
            (m) => m.LicitacaoModule
          ),
      },
      {
        path: "dominio",
        loadChildren: () =>
          import("./views/dominio/dominio.module").then((m) => m.DominioModule),
      }, 
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "configuracao",
        loadChildren: () =>
          import("./views/config/configuracao.module").then(
            (c) => c.ConfiguracaoModule
          ),
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
