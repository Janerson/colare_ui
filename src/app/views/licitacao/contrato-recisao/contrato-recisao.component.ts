import { Page } from "./../../../shared/services/generic/page";
import { ContratoRecisaoService } from "./../service/contrato-recisao.service";
import { Component, OnInit } from "@angular/core";
import { ContratoRecisao } from "../../../shared/entity/contrato-recisao";

@Component({
  selector: "app-contrato-recisao",
  templateUrl: "./contrato-recisao.component.html",
})
export class ContratoRecisaoComponent implements OnInit {
  protected page: Page<ContratoRecisao>;
  constructor(protected service: ContratoRecisaoService) {}

  ngOnInit(): void {
    this.service.paged().subscribe((data) => {
      this.page = data;
    });
  }
  pageChanged(event: any): void {
    this.service.paged(event.page - 1).subscribe((data) => {
      this.page = data;
    });
  }
}
