import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

const INPUT_VALUE_ACCESSOR:  any = {
  provide : NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=> CustomFieldComponent),
  multi:true
}

@Component({
  selector: 'c-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.css'],
  providers:[INPUT_VALUE_ACCESSOR]
})
export class CustomFieldComponent implements ControlValueAccessor {

  @Input() id: string
  @Input() label: string
  @Input() classIcon: string
  @Input() placeholder: string
  @Input() type = "number"


  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCB(v)
    }
  }

  constructor() { }

  onChangeCB: (_: any) => void = () => { };
  onTouchCB: (_: any) => void = () => { }

  writeValue(v: any): void {
    if (v !== this.innerValue) {
      this.value = v
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCB = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouchCB = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }



}
