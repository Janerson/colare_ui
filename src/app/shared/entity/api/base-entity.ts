import { Arquivo } from '../colare/colare-retorno';

/**
 * K - Tipo de Chave primária
 */
export class BaseEntity<K> {
  uuid?: K;
  arquivo?: Arquivo;

  constructor(obj: BaseEntity<K>) {
    Object.assign(this, obj);
  }
}

