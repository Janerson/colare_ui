import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "highlight",
})
export class HighlightPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(list: any, searchText: string): any {
    if (!list) {
      return [];
    }
    if (!searchText) {
      return list;
    }
    const value = list.replace(
        new RegExp(searchText, 'i'),
      `<span style='background-color:yellow'>${searchText.toUpperCase()}</span>`
    );

    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}
