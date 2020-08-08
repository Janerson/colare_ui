export interface Erro500 {
  message: string;
}

export interface Erro412 {
  level?: string;
  schema?: Schema;
  instance?: Instance;
  domain?: string;
  keyword?: string;
  message?: string;
  required?: string[];
  missing?: string[];
}

export interface Instance {
  pointer?: string;
}

export interface Schema {
  loadingURI?: string;
  pointer?: string;
}


export interface ErroValidacao {
  mensagens?: Mensagens;
}

export interface Mensagens {
  advertencias?: Regra[];
  informacoes?: Regra[];
  erros?: Regra[];
}

export interface Regra {
  regra?: number;
  mensagem?: string;
}
