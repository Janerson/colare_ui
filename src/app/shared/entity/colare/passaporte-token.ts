import { Representacao } from "./passaporte";

export interface PassaporteToken {
  token: Token;
  usuario: Usuario;
}

export interface Token {
  valor: string;
  claims: Claims;
}

export interface Claims {
  logadoComCertificadoDigital: boolean;
  sub: string;
  audience: string;
  created: number;
  representacao: number;
  exp: number;
}

export interface Usuario {
  id: number;
  status: string;
  dataCriacao: number;
  usuario: string;
  representacoes: Representacao[];
  nome: string;
  cpfCnpj: string;
  username: string;
  usuarioCriacao: UsuarioCriacao;
}

export interface AprovacaoStatus {
  enumValue: string;
  enumLabel: string;
}

export interface Perfil {
  id: number;
  status: string;
  dataCriacao: number;
  nome: string;
  usuarioCriacao: UsuarioCriacao;
}

export interface UsuarioCriacao {
  id: number;
  status: string;
  nome: string;
  codigoIBGE?: string;
}

export interface Representante {
  id: number;
  status: string;
  dataCriacao: number;
  dataAlteracao: number;
  usuarioCriacao: UsuarioCriacao;
  usuarioAlteracao: UsuarioCriacao;
}

export interface UnidadeGestoraRepresentada {
  id: number;
  status: string;
  dataCriacao: number;
  dataAlteracao: number;
  aprovacaoStatus: AprovacaoStatus;
  dataAlteracaoAprovacaoStatus: number;
  tipo: Tipo;
  municipio: UsuarioCriacao;
  descricao: string;
  usuarioCriacao: UsuarioCriacao;
  usuarioAlteracao: UsuarioCriacao;
}

export interface Tipo {
  id: number;
  status: string;
  dataCriacao: number;
  descricao: string;
  unidadeGestoraTipoConsorcio: boolean;
  unidadeOrcamentaria: boolean;
  usuarioCriacao: UsuarioCriacao;
}
