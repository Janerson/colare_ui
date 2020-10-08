import { DateService } from "../services/date.service";
import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CValidators {
  private static dateService: DateService = new DateService(); 

  static DateFormat(fmt: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control && control.value && !this.dateService.isValidDate(control.value, fmt)) {
        return { dateFormat: true};
      }
      return null;
    };
  }
}
