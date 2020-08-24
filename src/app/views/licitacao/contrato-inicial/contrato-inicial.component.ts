import { ContratoInicialService } from "./../service/contrato-inicial.service";
import { ContratoInicial } from "../../../shared/entity/LIC/contrato/contrato-inicial";
import { Page } from "../../../shared/entity/api/page";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: "app-contrato-inicial",
  templateUrl: "./contrato-inicial.component.html",
})
export class ContratoInicialComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  protected title: string;
  protected page: Page<ContratoInicial>;
  constructor(
    protected service: ContratoInicialService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((d) => {
      this.title = d.title;
    });
    this.service.paginado().subscribe((data) => {
      this.page = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pageChanged(event: any): void {
    this.service.paginado(event.page - 1).subscribe((data) => {
      this.page = data;
    });
  }
}
