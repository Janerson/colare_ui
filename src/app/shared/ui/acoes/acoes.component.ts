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
import { Arquivo } from "../../entity/colare/colare-retorno";

@Component({
  selector: "app-acoes",
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

  hasChanged = false;

  protected value: {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.form);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.value = value;
      this.hasChanged = this.form.dirty;
    });
  }
  onFileChange(file : File){
    if(file)this.onHomologar.emit(file)
    this._file.nativeElement.value = null;
  }
  
}
