import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDeDominioComponent } from './tipo-de-dominio/tipo-de-dominio.component';

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
        path: "tipo-regulamentacao",
        component: TipoDeDominioComponent,
        data: {
          title: "Tipo de decreto regulamentador"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DominioRoutingModule { }
