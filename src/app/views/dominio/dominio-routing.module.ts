import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Domínio",
    },
    children: [
      {
        path: "MENU",
        children: [
          {
            path: "",
            component: MenuComponent,
            data: {
              title: "Sidebar Menu",
            },
          },
          {
            path: ":id",
            component: MenuDetailComponent,
            data: {
              title: "Detalhar Menu",
            },
          },
          {
            path: "novo",
            component: MenuDetailComponent,
            data: {
              title: "Adicionar Menu",
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
export class DominioRoutingModule {}
