import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { RegLicitacaoService } from "../../../shared/services/licitacao/reg-licitacao.service";
import { RegLicitacao } from "../../../shared/entity/reg-licitacao";
import { Page } from '../../../shared/services/generic/page';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: "app-reg-licitacao",
  templateUrl: "./reg-licitacao.component.html"
})
export class RegLicitacaoComponent extends BaseFormComponent implements OnInit {
  
  page: Page<RegLicitacao>; 

  protected regLicitacao: RegLicitacao[];

  constructor(protected service: RegLicitacaoService, private alertService:AlertService) {
    super();
  }

  ngOnInit(): void {
    this.service.paged().subscribe(data => {
      console.log(data)
      this.page = data;
    });
  }

  pageChanged(event: any): void {
    console.log(event)
    //this.page = event.page;
    this.service.paged(event.page-1).subscribe(data => {
      console.log(data)
      this.page = data;
    });
  }

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

  show(){
    this.alertService.showAlertDanger("Erro ao salvar objeto","Ops")
  }
}
