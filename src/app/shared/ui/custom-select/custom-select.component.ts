import { AfterViewInit, Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { Observable } from "rxjs";

@Component({
  selector: "c-select",
  templateUrl: "./custom-select.component.html",
  styleUrls: ["./custom-select.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input()
  public items: any[] | Observable<any[]>;

  @Input()
  public itemLabelKey: string;

  public selectedItemLabel: string;

  constructor() {
  } 

  // -- -- -- -- -- -- -- -- -- -- control data handling -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  public onSelect(event: TypeaheadMatch): void {
    this.onTouched();
    this.onChange(event.item.codigo);
    this.updateSelectedItemLabel(event.item);
  }

  private updateSelectedItemLabel(obj: any): void {
    // this.selectedItemLabel = this.itemLabelKey
    //   ? _.get(obj, this.itemLabelKey)
    //   : obj;
  }

  writeValue(obj: any): void {
    console.log(obj, this.items)
  }

  private onChange: any = (i) => {};
  private onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
