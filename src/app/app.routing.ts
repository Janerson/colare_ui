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
    canActivate: [AuthGuard]
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
      title: "HOME",
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
        path: "TABELA",
        loadChildren: () =>
          import("./views/tabelas/tabelas.module").then((m) => m.TabelaModule),
      }, 
      {
        path: "DASHBOARD",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "DOMINIO",
        loadChildren: () =>
          import("./views/dominio/dominio.module").then(
            (c) => c.DominioModule
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
