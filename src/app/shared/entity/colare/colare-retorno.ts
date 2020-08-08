export interface ColareRetorno {
  arquivo: Arquivo;
  mensagens: Mensagens;
}

export interface Arquivo {
  uuid?: string;
  id?: number;
  ano?: number;
  mes?: number;
  idRepresentacao?: number;
  jsonNode: JSONNode;
  recibo?: string;
  statusEnvio?: string;
  arquivoHomologacao?: null;
  layoutSigla?: string;
  prestacaoDeContasSigla?: string;
}

export interface JSONNode {}

export interface Mensagens {
  advertencias: any[];
  informacoes: any[];
  erros: any[];
}
