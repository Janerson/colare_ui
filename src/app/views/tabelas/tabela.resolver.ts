import { TABELAS_DOMINIOS } from './../../shared/enum-layouts/tabelas';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Route } from "@angular/router";

@Injectable()
export class TabelaResolver implements Resolve<string> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    const entry = this.getTitle(route.params["TABELA"])
    return entry ? entry : "undefined title";
  }


  private getTitle(title:string){
    let str = title.replace(/-/g,"_")
      return TABELAS_DOMINIOS[str]
    //Object.keys(TABELAS_DOMINIOS).find
  }
}
