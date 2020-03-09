import { BaseEntity } from '../services/generic/base-entity';

export class Dominio extends BaseEntity  {
  nomeTipoDominio: string;
  dominios: Dominios[];
}

export class Dominios extends BaseEntity  {
  codigo: string;
  descricao: string;
  vigencia: string;
  ativo: boolean;
}
