// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  REG_LICITACAO:"LIC/REG_LICITACAO",
  API_URL: (layout:any) => `http://localhost:8080/api/${layout}`,
  URL_DEV_TCM:(layout: any,mes: any,ano: any)=> `https://testes.tcm.go.gov.br/recepcao/${layout}/${mes}/${ano}`,
};
