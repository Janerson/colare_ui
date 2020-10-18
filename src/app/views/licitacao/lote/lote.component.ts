import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../../../shared/entity/api/page';
import { Lote } from '../../../shared/entity/LIC/licitacao_faseum/licitacao-fase-um';

@Component({
  selector: 'c-lote[form]',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.css']
})
export class LoteComponent implements OnInit {

  @Input() form : FormGroup
  protected page: Page<Lote>;

  constructor() { }

  ngOnInit(): void {
  }


  pageChanged(event: any): void {
    // this.service
    //   .dominioPaginado(event.page - 1, this.title, this.formValue("descricao"))
    //   .subscribe((data) => {
    //     this.page = data;
    //   });
  }

}
