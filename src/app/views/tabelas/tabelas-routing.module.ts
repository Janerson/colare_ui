import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TABELAS_DOMINIOS } from "../../shared/enum-layouts/tabelas";
import { TipoDeTabelaComponent } from "./tipo-de-tabela/tipo-de-tabela.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Tabelas de Dominíos",
    },
    children: [
      {
        path: "",
        redirectTo: "TIPO-REGULAMENTACAO",
      },
      {
        path: "TIPO-DE-ENVIO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_DE_ENVIO,
        },
      },
      {
        path: "TIPO-RETIFICACAO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_DE_RETIFICACAO,
        },
      },
      {
        path: "TIPO-REGULAMENTACAO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_DECRETO_REGULAMENTADOR,
        },
      },
      {
        path: "NATUREZA-DO-OBJETO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.NATUREZA_DO_OBJETO,
        },
      },
      {
        path: "MODALIDADE-LICITACAO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.MODALIDADE_LICITACAO,
        },
      },
      {
        path: "NATUREZA-DO-PROCEDIMENTO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.NATUREZA_PROCEDIMENTO,
        },
      },
      {
        path: "TIPO-DE-LICITACAO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.TIPO_LICITACAO,
        },
      },
      {
        path: "REGIME-EXECUCAO",
        component: TipoDeTabelaComponent,
        data: {
          title: TABELAS_DOMINIOS.REGIME_EXECUCAO,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabelaRoutingModule {}
