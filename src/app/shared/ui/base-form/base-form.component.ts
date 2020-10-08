import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators} from "@angular/forms";
import { of, Observable, interval, EMPTY } from "rxjs";
import {
  switchMap,
  debounce,
  distinctUntilChanged,
  map,
} from "rxjs/operators";
import { ColareRetorno } from "../../entity/colare/colare-retorno";

// @Component({
//   selector: "app-base-form",
//   template: "",
// })
export abstract class BaseFormComponent {
  protected builder: FormBuilder = new FormBuilder();
  protected valueChanged: boolean = false;

  formulario: FormGroup;

  constructor() {
    this.buildForm();
  }

  /**
   *
   * Método chamado quando formulario é submetido e válido
   */
  abstract submit();

  public canDeactivate(): boolean {
    return !this.formulario.dirty;
  }

//@HostListener("window:beforeunload", ["$event"])
//unload($event: any) {
//  if (!this.canDeactivate()) {
//    $event.returnValue = true;
//  } else {
//    $event.returnValue = false;
//  }
//}

  /**
   * Retorna o valor do formControl ou o proprio formControl
   * @param controlPath path do controle no formulário,caso nao seja informado
   * sera retornado o proprio formulario
   * @param control Opcional (TRUE | FALSE - default) Quando true, retorna o FormControl, indicado
   * no parametro {{controlPath}}
   */
  formValue(controlPath?: any, control?: boolean){
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
        switchMap((status: any) => (status === "VALID" ? observable : EMPTY))
      )
      .subscribe(
        (result: any) => {
          result ? this.atualizaForm(result, fc) : {};
        },
        (error: { message: string }) => console.log(error.message)
      );
  }

  /**
   * Adiciona FormControls ao Formulário
   * @param name
   * @param control
   */
  adicionaControl(name: string, control: FormControl | FormArray | FormGroup) {
    this.formulario.addControl(name, control);
  }
  /**
   * Remove FormControls do Formulário
   * @param name
   * @param control
   */
  removeControl(name: string) {
    this.formulario.removeControl(name);
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
  private buildForm() {
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
        uuid: this.builder.control(null, []),
      },
      [Validators.required]
    );
  }

  atualizaFormulario(obj: Object, path?: string) {
    if (path) this.formulario.get(path).patchValue(obj);
    else this.formulario.patchValue(obj);
    this.validarStatusEnvio();
  }

  /**
   * Atualiza o formulário com o retorno de dados do envio ao colare
   * Usar quando precisar sincronizar a base dados local, com os dados do colare
   * @param retorno
   */
  atualizaFormColare(retorno: ColareRetorno) {
    this.formValue("arquivo", true).patchValue(retorno.arquivo);
    this.formValue(undefined, true).patchValue(retorno.arquivo.jsonNode);
    this.validarStatusEnvio();
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

  /**
   * Valida o Status de envio do Layout, caso statusEnvio=HOMOLOGADO
   * o formulário, será desativado para edição
   */
  validarStatusEnvio() {
    if (!this.formValue("arquivo.statusEnvio", true)) return;
    this.formValue("arquivo.statusEnvio") === "HOMOLOGADO"
      ? this.formulario.disable({
          onlySelf: true,
          emitEvent: false,
        })
      : this.formulario.enable({
          //onlySelf:true,
          //emitEvent:false
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
