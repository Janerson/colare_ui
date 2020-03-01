export const environment = {
  production: true,
  REG_LICITACAO: "LIC/REG_LICITACAO",
  API_URL: (layout: string) => `http://localhost:8080/api/${layout}`,
  URL_LAYOUT: (layout: string) =>
    `https://virtual.tcm.go.gov.br/recepcao/${layout}/${right(mes, 2)}/${ano}`,
  URL_VALIDAR_ENVIO:(recibo)=>`https://virtual.tcm.go.gov.br/recepcao/validar-recibo/${recibo}`,
  URL_REPRESENTACOES:
    "https://virtual.tcm.go.gov.br/passaporte/api/auth/representacoes",
  URL_TOKEN:
    "https://virtual.tcm.go.gov.br/passaporte/api/auth/certificado?representacao=21",
  URL_UPLOAD: "https://virtual.tcm.go.gov.br/recepcao/arquivo/upload",
  URL_DOWNLOAD: (recibo: string, idArquivo: string) =>
    `https://virtual.tcm.go.gov.br/envio-manual/api/envio/pdf/anexo/${recibo}/${idArquivo}`
};
