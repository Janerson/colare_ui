import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "cui-note",
    badge: {
      variant: "warning",
      text: "NEW",
    },
  },
  {
    title: true,
    name: "Tabelas"    
  },
  {
    name: "Domínios",
    url: "/dominio",
    icon: "icon-puzzle",
    children: [
      {
        name: "Tipo de envio",
        url: "/dominio/tipo-de-envio",
        icon: "icon-puzzle",
      },
      {
        name: "Tipo regulamentação",
        url: "/dominio/tipo-regulamentacao",
        icon: "icon-puzzle",
      },
      {
        name: "Natureza do Objeto",
        url: "/dominio/natureza-do-objeto",
        icon: "icon-puzzle",
      },
    ],
  },
  {
    title: true,
    name: "LICITAÇÕES",
  },
  {
    name: "Layout´s",
    url: "/LIC",
    icon: "icon-puzzle",
    children: [
      {
        name: "Reg. Proc. licitatórios",
        url: "/LIC/REG_LICITACAO",
        icon: "icon-notebook",
      },
      {
        name: "Contrato Rescisao",
        url: "/LIC/CONTRATO_RESC",
        icon: "icon-user-unfollow",
      },
      {
        name: "Situacao Procedimento",
        url: "/LIC/SITUACAO_PROCED",
        icon: "icon-notebook",
      },
      {
        name: "Registro de Precos",
        url: "/LIC/ADESAO_REG_PREC",
        icon: "icon-notebook",
      },
      {
        name: "Contrato aditivo",
        url: "/LIC/CONTRATO_ADT",
        icon: "icon-notebook",
      },
      {
        name: "Dispensa",
        url: "/LIC/DISPENSA_INEXIG",
        icon: "icon-notebook",
      },
      {
        name: "Licitação Fase 1",
        url: "/LIC/LICITACAOFASE1",
        icon: "icon-notebook",
      },
      {
        name: "Licitação Fase 2",
        url: "/LIC/LICITACAOFASE2",
        icon: "icon-notebook",
      },
      
      {
        name: "Contrato inicial",
        url: "/LIC/CONTRATO_INI",
        icon: "icon-notebook",
      },
    ],
  },
  {
    name: "Colors",
    url: "/theme/colors",
    icon: "icon-drop",
  },
  {
    name: "Typography",
    url: "/theme/typography",
    icon: "icon-pencil",
  },
  {
    title: true,
    name: "Atos de Pessoal",
  },
  {
    name: "Layout´s",
    url: "/LIC",
    icon: "icon-puzzle",
    children: [
      {
        name: "Pessoal Legislacao",
        url: "/LIC/regulamentacao",
        icon: "icon-notebook",
      },
      {
        name: "Pessoal Cargos",
        url: "/LIC/regulamentacao",
        icon: "icon-notebook",
      },
      {
        name: "Pessoal Cadastro",
        url: "/LIC/regulamentacao",
        icon: "icon-notebook",
      },
    ],
  },
  {
    name: "Base",
    url: "/base",
    icon: "icon-puzzle",
    children: [
      {
        name: "Cards",
        url: "/base/cards",
        icon: "icon-puzzle",
      },
      {
        name: "Carousels",
        url: "/base/carousels",
        icon: "icon-puzzle",
      },
      {
        name: "Collapses",
        url: "/base/collapses",
        icon: "icon-puzzle",
      },
      {
        name: "Forms",
        url: "/base/forms",
        icon: "icon-puzzle",
      },
      {
        name: "Navbars",
        url: "/base/navbars",
        icon: "icon-puzzle",
      },
      {
        name: "Pagination",
        url: "/base/paginations",
        icon: "icon-puzzle",
      },
      {
        name: "Popovers",
        url: "/base/popovers",
        icon: "icon-puzzle",
      },
      {
        name: "Progress",
        url: "/base/progress",
        icon: "icon-puzzle",
      },
      {
        name: "Switches",
        url: "/base/switches",
        icon: "icon-puzzle",
      },
      {
        name: "Tables",
        url: "/base/tables",
        icon: "icon-puzzle",
      },
      {
        name: "Tabs",
        url: "/base/tabs",
        icon: "icon-puzzle",
      },
      {
        name: "Tooltips",
        url: "/base/tooltips",
        icon: "icon-puzzle",
      },
    ],
  },
  {
    name: "Buttons",
    url: "/buttons",
    icon: "icon-cursor",
    children: [
      {
        name: "Buttons",
        url: "/buttons/buttons",
        icon: "icon-cursor",
      },
      {
        name: "Dropdowns",
        url: "/buttons/dropdowns",
        icon: "icon-cursor",
      },
      {
        name: "Brand Buttons",
        url: "/buttons/brand-buttons",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Charts",
    url: "/charts",
    icon: "icon-pie-chart",
  },
  {
    name: "Icons",
    url: "/icons",
    icon: "icon-star",
    children: [
      {
        name: "CoreUI Icons",
        url: "/icons/coreui-icons",
        icon: "icon-star",
        badge: {
          variant: "success",
          text: "NEW",
        },
      },
      {
        name: "Flags",
        url: "/icons/flags",
        icon: "icon-star",
      },
      {
        name: "Font Awesome",
        url: "/icons/font-awesome",
        icon: "icon-star",
        badge: {
          variant: "secondary",
          text: "4.7",
        },
      },
      {
        name: "Simple Line Icons",
        url: "/icons/simple-line-icons",
        icon: "icon-star",
      },
    ],
  },
  {
    name: "Notifications",
    url: "/notifications",
    icon: "icon-bell",
    children: [
      {
        name: "Alerts",
        url: "/notifications/alerts",
        icon: "icon-bell",
      },
      {
        name: "Badges",
        url: "/notifications/badges",
        icon: "icon-bell",
      },
      {
        name: "Modals",
        url: "/notifications/modals",
        icon: "icon-bell",
      },
    ],
  },
  {
    name: "Widgets",
    url: "/widgets",
    icon: "icon-calculator",
    badge: {
      variant: "info",
      text: "NEW",
    },
  },
  {
    divider: true,
  },
  {
    title: true,
    name: "Folha de Pagamento",
  },
  {
    name: "Layout´s",
    url: "/LIC",
    icon: "icon-puzzle",
    children: [
      {
        name: "Reg. Proc. licitatórios",
        url: "/LIC/regulamentacao",
        icon: "icon-notebook",
      },
    ],
  },
  {
    name: "Pages",
    url: "/pages",
    icon: "icon-star",
    children: [
      {
        name: "Login",
        url: "/login",
        icon: "icon-star",
      },
      {
        name: "Register",
        url: "/register",
        icon: "icon-star",
      },
      {
        name: "Error 404",
        url: "/404",
        icon: "icon-star",
      },
      {
        name: "Error 500",
        url: "/500",
        icon: "icon-star",
      },
    ],
  },
  {
    name: "Disabled",
    url: "/dashboard",
    icon: "icon-ban",
    badge: {
      variant: "success",
      text: "NEW",
    },
    attributes: { disabled: true },
  },
];
