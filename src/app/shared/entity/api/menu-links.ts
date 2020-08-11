import { BaseEntity } from "./base-entity";
import {
  INavBadge,
  INavData,
} from "@coreui/angular/lib/sidebar/app-sidebar-nav";

export class MenuLink extends BaseEntity<String> implements INavData {
  name?: string;
  url?: string;
  layoutTitulo?: string;
  layoutDescricao?: string;
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: MenuLink[];
  variant?: string;
  divider?: boolean;
  class?: string;
}
