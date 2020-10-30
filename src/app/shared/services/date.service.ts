import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class DateService {
  private moment = moment();

  constructor() {
    this.moment.locale("pt-BR");
  }

  // format(date: any, fmt: string): string | any {
  //   //moment.locale("pt-BR");
  //   //console.log(date);
  //   //return moment(date).format(fmt);
  //   return format(date, fmt);
  // }

  // isValidDate(date, fmt): boolean {
  //   console.log(isMatch(date, fmt))
  //   // return moment(date, fmt, true).isValid();
  //   return isMatch(date, fmt);
  // }
}
