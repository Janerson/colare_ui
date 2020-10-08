import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { FormControlName, FormControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: "[validator]",
  templateUrl: "./validator-component.component.html",
  styleUrls: ["./validator-component.component.css"],
})
export class ValidatorComponentComponent implements OnInit, AfterViewInit {
  
  @Input() error_msg = "";
  @ContentChild(FormControlName) formControl: FormControl;

  constructor(private el: ElementRef) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe(() => {
      this.erros(this.formControl.errors);
    });
  }

  private erros(err: ValidationErrors) {
   
    this.isValid();

    if (!err) return;

    Object.keys(err).forEach((key) => {
      console.log(key, err[key]);
      switch (key) {
        case "email":
          this.error_msg = "E-mail inválido!";
          break;
        case "required":
          this.error_msg = "Campo obrigatório!";
          break;
        case "mask":
          this.error_msg = `Formato inválido, esperado ${err[key].requiredMask}`;
          break;
        case "dateFormat":
          this.error_msg = `Data inválida!`;
          break;
        case "minlength":
        case "maxlength":
          this.error_msg = `Limite de ${err[key].requiredLength} caracteres`;
          break;
        default:
          break;
      }
    });
    
  }

  private isValid() {
    if (this.formControl.valid) {
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("has-error");
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("is-invalid");       
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.add("is-valid");       
    } else {
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.add("has-error");
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.add("is-invalid");      
      this.el.nativeElement
        .querySelector(".form-control")
        .classList.remove("is-valid");      
    }
  }

  
}
