import { DateService } from "./../../services/date.service";
import { Component, forwardRef, Injector, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";
//import { parseISO } from 'date-fns';

@Component({
  selector: "c-datepicker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements ControlValueAccessor, OnInit{
  /**
   * Formato de saida da data
   * https://momentjs.com/docs/#/displaying/format/
   */
  @Input() outputFormat;
  /**
   * Formato de visualização da data
   * Default DD/MM/YYYY
   * https://momentjs.com/docs/#/displaying/format/
   */
  @Input() inputFormat = "DD/MM/YYYY";
  /**
   * "day" | "month" | "year"
   */
  @Input() viewMode;

  ngControl:NgControl

  private onChange: any = () => {};
  public onTouched: any = () => {};
  protected _value: string = "";

  constructor(private service: DateService , private inj: Injector) {
    
  }

  ngOnInit() {
    this.ngControl = this.inj.get(NgControl)
  }

  public bsValueChange(e) {
    this.writeValue(e);
  }

  public writeValue(value: any) {
    // if(this.service.isValidDate(this.transformDate(value, this.outputFormat),this.outputFormat)){
    //   this._value = this.transformDate(value, this.inputFormat);
    //   this.onChange(this.transformDate(value, this.outputFormat))
    // }else{
    //   this.onChange(value)
    // }
    // //console.log(value, this._value)
   
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {}

  // private transformDate(value: any, format) {
  //     return this.service.format(value, format);
  // }
}
