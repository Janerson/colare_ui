import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-reg-licitacao",
  templateUrl: "./reg-licitacao.component.html"
})
export class RegLicitacaoComponent implements OnInit {
  @ViewChild("labelImport")
  labelImport: ElementRef;

  form: FormGroup;
  fileToUpload: File = null;
  constructor() {
    this.form = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}

  isCollapsed: boolean = false;
  iconCollapse: string = "icon-arrow-up";

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
  }

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
