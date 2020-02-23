import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";
import { RegLicitacaoDetailComponent } from "./reg-licitacao/reg-licitacao-detail/reg-licitacao-detail.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Licitação"
    },
    children: [
      {
        path: "",
        redirectTo: "reg_licitacao"
      },
      {
        path: "reg_licitacao",
        component: RegLicitacaoComponent,
        data: {
          title: "Regulamentação dos procedimentos licitatórios"
        }
      },
      {
        path: "reg_licitacao/detail/:id",
        component: RegLicitacaoDetailComponent,
        data: {
          title:
            "Detalhamento Regulamentação dos procedimentos licitatórios"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacaoRoutingModule {}
