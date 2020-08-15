import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { of, Observable, empty, interval } from "rxjs";
import {
  tap,
  switchMap,
  debounce,
  distinctUntilChanged,
  map,
} from "rxjs/operators";
import { ColareRetorno } from '../../entity/colare/colare-retorno';

@Component({
  selector: "app-base-form",
  template: "",
})
export class BaseFormComponent {
  protected builder: FormBuilder = new FormBuilder();
  protected valueChanged: boolean = false;

  formulario: FormGroup;

  constructor() {
    this.builForm();
  }

  /**
   * Método chamado quando formulario válido
   */
  submit() {
    alert("submit() method should be overridden");
    throw new Error("submit() method should be overridden");
  }

  /**
   * Retorna o valor do formControl ou o proprio formControl
   * @param controlPath path do controle no formulário,caso nao seja informado
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
        distinctUntilChanged(),
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
   * @param obj
   * @param controlPath
   */
  private atualizaForm(obj: any, controlPath?: any) {
    if (controlPath) {
      this.formValue(controlPath, true).patchValue(obj);
    } else {
      this.formValue(undefined, true).patchValue(obj);
    }
  }
  /**
   *  Cria o Formulario Base
   */
  private builForm() {
    this.formulario = this.builder.group(
      {
        arquivo: this.builder.group({
          uuid: this.builder.control(null),
          id: this.builder.control(null, []),
          ano: this.builder.control(null, []),
          mes: this.builder.control(null, []),
          idRepresentacao: this.builder.control(null, []),
          recibo: this.builder.control(null, []),
          statusEnvio: this.builder.control(null, []),
          arquivoHomologacao: this.builder.control(null, []),
          layoutSigla: this.builder.control(null, []),
          prestacaoDeContasSigla: this.builder.control(null, []),
        }),
      },
      [Validators.required]
    );
  }

  atualizaFormulario(obj: any, controlPath?: boolean) {
    this.atualizaForm(obj, controlPath);
  }

  atualizaFormColare(retorno : ColareRetorno){
    this.formValue("arquivo", true).patchValue(retorno.arquivo)
    this.formValue(undefined, true).patchValue(retorno.arquivo.jsonNode)
   
  }

/**
 * Sempre usar o metodo onSubmit no evento de submit do formulário
 * Ex: <form (submit)="onSubmit()">...</form>
 */
  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }


  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
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
      "is-invalid": this.verificaRequired(campo),
    };
  }

  /**
   *
   *
   */
  validaForm() {
    of(this.formulario.controls).pipe(map((v) => console.log(v)));
  }
}
