import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg-licitacao-detail',
  templateUrl: './reg-licitacao-detail.component.html',
})
export class RegLicitacaoDetailComponent implements OnInit {

   
  @ViewChild('labelImport')
  labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;

  constructor() { 
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }
  
  import(): void {
    console.log('import ' + this.fileToUpload.name);
  }

}
