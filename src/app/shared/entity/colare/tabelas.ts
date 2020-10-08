import { BaseEntity } from '../base-entity';

export class TipoTabela extends BaseEntity<Number>  {
  nomeTipoDominio: string;
  dominios: Tabela[];
}

export class Tabela extends BaseEntity<String>  {
  codigo: string;
  descricao: string;
  vigencia: string;
  ativo: boolean;
}
