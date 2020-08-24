import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-acoes[form]",
  templateUrl: "./acoes.component.html",
  styleUrls: ["./acoes.component.css"],
})
export class AcoesComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;

  @Output() onTransmitir = new EventEmitter<boolean>();
  @Output() onSincronizar = new EventEmitter<boolean>();
  @Output() onPdfHomologacao = new EventEmitter<boolean>();
  @Output() onHomologar = new EventEmitter<File>();
  @Output() onRetificar = new EventEmitter<boolean>();
  @Output() onCancelar = new EventEmitter<boolean>();

  @ViewChild("file") _file: ElementRef;

  isHomologado = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
   this.validaAcoes()
  }
  onFileChange(file : File){
    if(file)this.onHomologar.emit(file)
    this._file.nativeElement.value = null;
  }
  
  validaAcoes(){
    this.form.get("arquivo.statusEnvio").valueChanges.subscribe(value => {
      this.isHomologado = value == "HOMOLOGADO" ? true:false
    })
  }

}
