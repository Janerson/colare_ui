import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";

@Component({
  selector: "app-reg-licitacao-detail",
  templateUrl: "./reg-licitacao-detail.component.html"
})
export class RegLicitacaoDetailComponent extends BaseFormComponent
  implements OnInit {
  @ViewChild("labelImport")
  labelImport: ElementRef;

  fileToUpload: File = null;

  constructor() {
    super();
    this.formulario = this.builder.group({
      codTipoRegulamentacao: this.builder.control("", [Validators.required]),
      existeRegulamentacaoMunicipal: this.builder.control("", [
        Validators.required
      ]),
      numeroDecretoMunicipal: this.builder.control("", [Validators.required]),
      dataDecretoMunicipal: this.builder.control("", [Validators.required]),
      dataPublicacao: this.builder.control("", [Validators.required]),
      idDocumentoPDF: this.builder.control("", [Validators.required]),
      codTipoEnvio: this.builder.control("", [Validators.required]),
      motivoAtualizacaoCorrecao: this.builder.control("", [
        Validators.required
      ]),
      detalhamentoLc123: this.builder.group({
        regulamentouParticipExclusivaMEEPP: this.builder.control(""),
        artigoRegulamentouParticipExclusivaMEEPP: this.builder.control(""),
        valorLimiteRegParticipExclusivaMEEPP: this.builder.control(""),
        regulamentouProcSubContratacaoMEEPP: this.builder.control(""),
        artigoProcSubContratacaoMEEPP: this.builder.control(""),
        percentualSubContratacaoMEEPP: this.builder.control(""),
        regulamentouCriteriosEmpenhoPagamentoMEEPP: this.builder.control(""),
        artigoEmpenhoPagamentoMEEPP: this.builder.control(""),
        regulamentouPercObjetoContratacaoMEEPP: this.builder.control(""),
        artigoPercObjetoContratacaoMEEPP: this.builder.control(""),
        percentualObjetoContratacaoMEEPP: this.builder.control("")
      })
    });
  }

  ngOnInit(): void {}

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(", ");
    this.fileToUpload = files.item(0);
  }

  import(): void {
    console.log("import " + this.fileToUpload.name);
  }
}
