// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/**
 * Retorna a quantidade de caracteres {n} da esquerda p/ direita
 * @param str String
 * @param n Qtd de caracteres
 */
export const left = (str: any, n: any) => {
    if (n <= 0) return "";
    else if (n > String(str).length) return str;
    else return String(str).substring(0, n);
  };
  
  /**
   * Retorna a quantidade de caracteres {n} da direita p/ esquerda
   * @param str String
   * @param n Qtd de caracteres
   */
  export const right = (str: any, n: any) => {
    if (n <= 0) return "";
    else if (n > String(str).length) return str;
    else {
      var iLen = String(str).length;
      return String(str).substring(iLen, iLen - n);
    }
  };
  
  const d = new Date();
  const mes = "000" + (d.getMonth() + 1);
  const ano = d.getUTCFullYear();
  export const BASE_URL_TCM = "https://testes.tcm.go.gov.br";
  export const BASE_URL_API = "https://colare.herokuapp.com/api/";



  
  export const environment = {
    production: false,
    DOMINIO: "DOMINIO/PROCESS_JSON",
    uuidRegex: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
    /**
     * REGULAMENTAÇÃO DOS PROCEDIMENTOS LICITATÓRIOS
     */
    REG_LICITACAO: "LIC/REG_LICITACAO",
    /**
     * CONTRATO RECISAO
     */
    CONTRATO_RESC: "LIC/CONTRATO_RESC",
    /**
     * CONTRATO INICIAL
     */
    CONTRATO_INI: "LIC/CONTRATO_INI",
    /**
     * @param layout 
     */
    API_URL: (layout: string) => `${BASE_URL_API}${layout}`,
    /**
     * @param layout 
     */
    URL_LAYOUT: (layout: string) =>
      `${BASE_URL_TCM}/recepcao/${layout}/${right(mes, 2)}/${ano}`,
    /**
     *
     */
    URL_VALIDAR_ENVIO: `${BASE_URL_TCM}/recepcao/validar-recibo/`,
    /**
     * 
     */
    URL_REPRESENTACOES: `${BASE_URL_TCM}/passaporte/api/auth/representacoes`,
    /**
     * 
     */
    URL_TOKEN: `${BASE_URL_TCM}/passaporte/api/auth/certificado?representacao=`,
    /**
     * 
     */
    URL_UPLOAD: `${BASE_URL_TCM}/recepcao/arquivo/upload`,
    /**
     * 
     */
    URL_DOWNLOAD: (recibo: string, idArquivo: string) =>
      `${BASE_URL_TCM}/envio-manual/api/envio/pdf/anexo/${recibo}/${idArquivo}`,
  };
  