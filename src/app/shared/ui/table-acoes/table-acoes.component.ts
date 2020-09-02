import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-table-acoes[botoes]',
  templateUrl: './table-acoes.component.html',
  styleUrls: ['./table-acoes.component.css']
})
export class TableAcoesComponent implements OnInit {
 
  @Input() botoes:string[]
  @Output() onEditar = new EventEmitter<boolean>();
  @Output() onApagar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
