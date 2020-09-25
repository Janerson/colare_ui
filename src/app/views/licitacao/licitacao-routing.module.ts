import { ContratoInicialDetailComponent } from "./contrato-inicial/contrato-inicial-detail/contrato-inicial-detail.component";
import { ContratoInicialComponent } from "./contrato-inicial/contrato-inicial.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegLicitacaoComponent } from "./reg-licitacao/reg-licitacao.component";
import { RegLicitacaoDetailComponent } from "./reg-licitacao/reg-licitacao-detail/reg-licitacao-detail.component";
import { ContratoRecisaoComponent } from "./contrato-recisao/contrato-recisao.component";
import { ContratoRecisaoDetailComponent } from "./contrato-recisao/contrato-recisao-detail/contrato-recisao-detail.component";
import { CardComponent } from "../../shared/ui/card/card.component";
import { CanDeactivateGuard } from '../../auth/can-deactive.guard';

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Licitação",
    },
    children: [
      {
        path: "",
        component:CardComponent,
        data:{
          title: "Layout´s",
          spc:"LIC"
        }
      },
      {
        path: "REG_LICITACAO",      
        children: [
          {
            path: "",
            component: RegLicitacaoComponent,
            data: {
              title: "Regulamentações",
            },
          },
          {
            path: ":id",
            component: RegLicitacaoDetailComponent,
            canDeactivate:[CanDeactivateGuard],
            data: {
              title: "Detalhar Regulamentação",
            },
          },
          {
            path: "novo",
            component: RegLicitacaoDetailComponent,
            data: {
              title: "Adicionar Regulamentação",
            },
          },
        ],
      },
      {
        path: "CONTRATO_INI",
        children: [
          {
            path: "",
            component: ContratoInicialComponent,
            data: {
              title: "Contrato Inicial",
            },
          },
          {
            path: ":id",
            component: ContratoInicialDetailComponent,
            data: {
              title: "Detalhar Contrato Inicial",
            },
          },
          {
            path: "novo",
            component: ContratoInicialDetailComponent,
            data: {
              title: "Adicionar Contrato Inicial",
            },
          },
        ],
      },
      {
        path: "CONTRATO_RESC",
        children: [
          {
            path: "",
            component: ContratoRecisaoComponent,
            data: {
              title: "Contrato Recisão",
            },
          },
          {
            path: ":id",
            component: ContratoRecisaoDetailComponent,
            data: {
              title: "Detalhar Contrato Recisão",
            },
          },
          {
            path: "novo",
            component: ContratoRecisaoDetailComponent,
            data: {
              title: "Adicionar Contrato Recisão",
            },
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitacaoRoutingModule {}
