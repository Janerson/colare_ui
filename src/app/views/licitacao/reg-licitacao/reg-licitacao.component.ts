import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reg-licitacao',
  templateUrl: './reg-licitacao.component.html',
})
export class RegLicitacaoComponent implements OnInit {

  @ViewChild('labelImport')
  labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;
  constructor() { }

  ngOnInit(): void {
  }

  
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }



}
