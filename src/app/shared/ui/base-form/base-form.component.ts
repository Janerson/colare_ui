import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { of, Observable, empty, interval } from "rxjs";
import { tap, switchMap, debounce, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-base-form",
  template: ""
})
export class BaseFormComponent implements OnInit {
  formulario: FormGroup;
  constructor() {}

  ngOnInit() {}

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
  /**
   *
   *
   */
  validaForm() {
    of(this.formulario.controls).pipe(tap(v => console.log(v)));
  }
}
