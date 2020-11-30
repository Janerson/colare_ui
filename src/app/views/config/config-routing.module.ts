import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Configurações",
    },
    children: [
      {
        path: "",
        component:ConfiguracoesComponent,
        data:{
          title: "Domínio",
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {}
