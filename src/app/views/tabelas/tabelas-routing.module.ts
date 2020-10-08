import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TABELAS_DOMINIOS } from "../../shared/enum-layouts/tabelas";
import { TipoDeTabelaComponent } from './tipo-de-tabela/tipo-de-tabela.component';

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
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_DE_ENVIO
        }
      },
      {
        path:"tipo-retificacao",
        component:TipoDeTabelaComponent,
        data:{
          title: TABELAS_DOMINIOS.TIPO_DE_RETIFICACAO
        }
      },
      {
        path: "tipo-regulamentacao",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_DECRETO_REGULAMENTADOR
        }
      },
      {
        path: "natureza-do-objeto",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.NATUREZA_DO_OBJETO
        }
      },
      {
        path: "modalidade-licitacao",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.MODALIDADE_LICITACAO
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabelaRoutingModule {}
