import { BaseEntity } from '../base-entity';

export class Dominio extends BaseEntity<Number>  {
  nomeTipoDominio: string;
  dominios: Dominios[];
}

export class Dominios extends BaseEntity<String>  {
  codigo: string;
  descricao: string;
  vigencia: string;
  ativo: boolean;
}
