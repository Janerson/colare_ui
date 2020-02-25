import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BaseFormComponent } from "../../../../shared/ui/base-form/base-form.component";
import { RegLicitacaoService } from "../../../../shared/services/licitacao/reg-licitacao.service";
import { ActivatedRoute } from "@angular/router";
import { RegLicitacao } from "../../../../shared/entity/reg-licitacao";
import { SharedService } from '../../../../shared/services/shared-service.service';


@Component({
  selector: "app-reg-licitacao-detail",
  templateUrl: "./reg-licitacao-detail.component.html"
})
export class RegLicitacaoDetailComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

 
  private id: number;

  @ViewChild("labelImport")
  labelImport: ElementRef;

  fileToUpload: File = null;

  constructor(
    private service: RegLicitacaoService,
    private route: ActivatedRoute,
    private sharedService : SharedService, 
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      this.service.loadByID(parseInt(p.get("id"))).subscribe(r => {
        this.formulario.patchValue(r);
        //this.atualizaForm(r,this.formulario)
      });
    });

    this.sharedService.emitChange(this.formulario)
  }

  ngOnDestroy(): void {
    this.formulario.reset()
    this.sharedService.emitChange(this.formulario)
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(", ");
    this.fileToUpload = files.item(0);
  }

  save() {
    this.service.create(this.formulario.value).subscribe(s =>{
      console.log(s)
      //this.alertService.showAlertSucess("Salvo com sucesso","Regulamentação")
    });
  }

  private buildForm() {
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

}
