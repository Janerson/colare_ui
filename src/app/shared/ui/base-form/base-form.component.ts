import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { of, Observable, empty, interval } from "rxjs";
import {
  tap,
  switchMap,
  debounce,
  distinctUntilChanged,
  map
} from "rxjs/operators";

@Component({
  selector: "app-base-form",
  template: ""
})
export class BaseFormComponent implements OnInit {
  formulario: FormGroup;

  protected builder: FormBuilder = new FormBuilder();

  constructor() {}

  ngOnInit() {}

  /**
   * Método chamado quando formulario válido
   */
  submit() {   
    throw new Error("submit() method should be overridden");
  }

  /**
   * Retorna o valor do formControl ou o proprio formControl
   * @param form Formulário
   * @param controlPath Opcional path do controle no formulário,caso nao seja informado
   * sera retornado o proprio formulario
   * @param control Opcional (TRUE | FALSE - default) Quando true, retorna o FormControl, indicado
   * no parametro {{controlPath}}
   */
  formValue(controlPath?: any, control?: boolean): any {
    return controlPath === undefined
      ? control
        ? this.formulario
        : this.formulario.value
      : control
      ? this.formulario.get(controlPath)
      : this.formulario.get(controlPath).value;
  }
  /**
   * @param path
   * @param observable
   */
  onStatusChanged(path: string, observable: Observable<any>) {
    let fc = path.slice(0, path.indexOf("."));
    this.formValue(path, true)
      .statusChanges.pipe(
        tap(status => console.log(status)),
        distinctUntilChanged(),
        tap(() => console.log(observable)),
        debounce(() => interval(1500)),
        switchMap((status: any) => (status === "VALID" ? observable : empty()))
      )
      .subscribe(
        (result: any) => {
          result ? this.atualizaForm(result, fc) : {};
        },
        (error: { message: string }) => console.log(error.message)
      );
  }

  /**
   *
   * @param form
   * @param obj
   * @param controlPath
   */
  atualizaForm(obj: any, controlPath?: any) {
    if (controlPath) {
      this.formValue(controlPath, true).patchValue(obj);
    } else {
      this.formValue(undefined, true).setValue(obj);
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo).hasError("required") &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get("email");
    if (campoEmail.errors) {
      return campoEmail.errors["email"] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "is-invalid": this.verificaRequired(campo)
    };
  }

  /**
   *
   *
   */
  validaForm() {
    of(this.formulario.controls).pipe(map(v => console.log(v)));
  }
}
