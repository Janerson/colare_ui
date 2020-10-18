import { Arquivo } from "./colare/colare-retorno";

const IGNORE_FIELDS = new Map<string, string[]>();

function JsonIgnore(cls: any, name: string) {
  let clsName = cls.constructor.name;
  let list: string[];

  if (IGNORE_FIELDS.has(clsName)) {
    list = IGNORE_FIELDS.get(clsName);
  } else {
    list = [];
    IGNORE_FIELDS.set(clsName, list);
  }

  list.push(name);
}
/**
 * K - Tipo de Chave primária
 */
export class BaseEntity<K> {
  uuid?: K;
  arquivo?: Arquivo;

  constructor(obj: BaseEntity<K>) {
    Object.assign(this, obj);
  }

 toJson? = (): { [name: string]: any } => {
    let json = {};
    let ignore = IGNORE_FIELDS.get(this.constructor.name);

    Object.getOwnPropertyNames(this)
      .filter((name) => ignore.indexOf(name) < 0)
      .forEach((name) => {
        json[name] = this[name];
      });

    return json;
  }
}
