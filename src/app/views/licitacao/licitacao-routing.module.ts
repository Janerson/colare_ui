import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";
import { RegLicitacaoDetailComponent } from "./reg-licitacao/reg-licitacao-detail/reg-licitacao-detail.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Licitação"
    },
    children: [      
      {
        path: "regulamentacao",
        children: [
          {
            path: "",
            component: RegLicitacaoComponent,
            data: {
              title: "Regulamentações"
            }
          },
          {
            path: ":id",
            component: RegLicitacaoDetailComponent,
            data: {
              title: "Detalhar Regulamentação"
            }
          },
          {
            path: "novo",
            component: RegLicitacaoDetailComponent,
            data: {
              title: "Adicionar Regulamentação"
            }
          }
        ]
      }
    ]
  }
];

/*
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
        },
        children: [
          {
            path: "detail/:id",
            component: RegLicitacaoDetailComponent,
            data: {
              title:
                "Detalhamento Regulamentação dos procedimentos licitatórios"
            }
          }
        ]
      }
    ]
  }
];
*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacaoRoutingModule {}
