import { TabelaResolver } from './tabela.resolver';
import { TabelasComponent } from './tabelas/tabelas.component';
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
        component: TabelasComponent,
        data:{
          title : "Tabelas"
        }
      },
      {
        path: ":TABELA",
        component: TipoDeTabelaComponent,
        resolve:{
          title:TabelaResolver
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
