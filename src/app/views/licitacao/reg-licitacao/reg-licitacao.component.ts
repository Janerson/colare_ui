import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";

@Component({
  selector: "app-reg-licitacao",
  templateUrl: "./reg-licitacao.component.html"
})
export class RegLicitacaoComponent extends BaseFormComponent implements OnInit {
  constructor() {
    super();
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
}
