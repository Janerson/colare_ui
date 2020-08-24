import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TipoDeDominioComponent } from "./tipo-de-dominio/tipo-de-dominio.component";
import { TABELAS_DOMINIOS } from "../../shared/enum-layouts/tabelas";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Tabelas de Dominíos"
    },
    children: [
      {
        path: "",
        redirectTo: "tipo-regulamentacao"
      },
      {
        path: "tipo-de-envio",
        component: TipoDeDominioComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_DE_ENVIO
        }
      },
      {
        path:"tipo-retificacao",
        component:TipoDeDominioComponent,
        data:{
          title: TABELAS_DOMINIOS.TIPO_DE_RETIFICACAO
        }
      },
      {
        path: "tipo-regulamentacao",
        component: TipoDeDominioComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_DECRETO_REGULAMENTADOR
        }
      },
      {
        path: "natureza-do-objeto",
        component: TipoDeDominioComponent,
        data: {
          title: TABELAS_DOMINIOS.NATUREZA_DO_OBJETO
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DominioRoutingModule {}
