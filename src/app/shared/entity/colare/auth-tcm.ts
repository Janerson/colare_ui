export interface AuthTcm {
  nome: string;
  representacoes: Representacao[];
}

export interface Representacao {
  codigo: number;
  representacao: string;
  unidadeId: number;
  unidade: string;
  tipo: string;
  poder: string;
  municipioId: number;
  municipio: string;
  dataInicioRepresentacao: Date;
  dataFimRepresentacao: Date;
}
