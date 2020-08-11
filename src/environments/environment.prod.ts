// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const BASE_URL_TCM = "https://virtual.tcm.go.gov.br";
export const BASE_URL_API = "http://localhost:8080/api/";

/**
 * Dados de acesso da aplicaçao
 */
const CLIENT_ID = '4FC5232E-9172-4DC3-B01F-ECCEC7D5D0B5'
const CLIENT_PASS = 'dom02041989'

export const environment = {
  
  production: true,
  api_oauth_login: `${BASE_URL_API}oauth/token`,
  api_oauth_logout: `${BASE_URL_API}oauth/logout`,
  client_token :'Basic NEZDNTIzMkUtOTE3Mi00REMzLUIwMUYtRUNDRUM3RDVEMEI1OmRvbTAyMDQxOTg5',
  
  /**
   * Endpoint para upload dos arquivos de JSON referentes a tabelas de Domínio
   */
  dominio: "DOMINIO/UPLOAD",
  dominio_menu:"DOMINIO/MENU_LINK",
  /**
   * REGULAMENTAÇÃO DOS PROCEDIMENTOS LICITATÓRIOS
   */
  reg_licitacao: "LIC/REG_LICITACAO",
  /**
   * CONTRATO RECISAO
   */
  contrato_resc: "LIC/CONTRATO_RESC",
  /**
   * CONTRATO INICIAL
   */
  contrato_ini: "LIC/CONTRATO_INI",
  /**
   * 
   * @param layout
   */
  api_url: (layout: string) => `${BASE_URL_API}${layout}`,
  /**
   * @param layout
   */
  url_layout: (layout: string) => `${BASE_URL_TCM}/recepcao/${layout}`,
  /**
   *
   */
  url_validar_envio: `${BASE_URL_TCM}/recepcao/validar-recibo/`,
  /**
   *
   */
  url_representacoes: `${BASE_URL_TCM}:8443/passaporte/api/auth/representacoes`,
  /**
   *
   */
  url_token: `${BASE_URL_TCM}:8443/passaporte/api/auth/certificado?representacao=`,
  /**
   *
   */
  url_upload: `${BASE_URL_TCM}/recepcao/arquivo/upload`,
  /**
   *
   */
  url_download_pdf: (recibo: string, idArquivo: string) =>
    `${BASE_URL_TCM}/envio-manual/api/envio/pdf/anexo/${recibo}/${idArquivo}`,
  /**
   *
   */
  url_pdf_homologacao: (recibo: string) =>
    `${BASE_URL_TCM}/envio-manual/api/envio/pdf/homologacao/${recibo}`,
  /**
   *
   */
  url_homologa_envio: (layout: string, mes: number, ano: number, id: number) =>
    `${BASE_URL_TCM}/recepcao/${layout}/${mes}/${ano}/${id}/homologar`,
};
