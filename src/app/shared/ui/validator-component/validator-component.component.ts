import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import {
  FormControlName,
  FormControl,
  ValidationErrors,
} from "@angular/forms";

@Component({
  selector: "[validator]",
  templateUrl: "./validator-component.component.html",
  styleUrls: ["./validator-component.component.css"],
})
export class ValidatorComponentComponent implements OnInit, AfterViewInit {
  @Input() error_msg = "";
  @ContentChild(FormControlName) formControl: FormControl;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe(() => {
      this.erros(this.formControl.errors);
    });
  }

  private erros(err: ValidationErrors) {
    this.isValid();
    if (!err) return;
    Object.keys(err).forEach((key) => {
      console.log(key);
      switch (key) {
        case "email":
          this.error_msg = "E-mail inválido!";
          break;
        case "required":
          this.error_msg = "Campo obrigatório!";
          break;
        default:
          break;
      }
    });
  }

  private isValid() {
    this.formControl.valid
      ? this.el.nativeElement
          .querySelector(".input-group")
          .classList.remove("has-error")
      : this.el.nativeElement
          .querySelector(".input-group")
          .classList.add("has-error");
  }

  ngOnInit(): void {}
}
