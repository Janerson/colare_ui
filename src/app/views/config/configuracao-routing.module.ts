import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InavdataComponent } from "./inavdata/inavdata.component";
import { InavdataDetailComponent } from "./inavdata/inavdata-detail/inavdata-detail.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Configuração",
    },
    children: [
      {
        path: "menu",
        children: [
          {
            path: "",
            component: InavdataComponent,
            data: {
              title: "Sidebar Links",
            },
          },
          {
            path: ":id",
            component: InavdataDetailComponent,
            data: {
              title: "Detalhar Link",
            },
          },
          {
            path: "novo",
            component: InavdataDetailComponent,
            data: {
              title: "Adicionar Lick",
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
export class ConfiguracaoRoutingModule {}
