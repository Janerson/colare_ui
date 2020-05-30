import { Page } from "./../../../shared/services/generic/page";
import { ContratoRecisaoService } from "./../service/contrato-recisao.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContratoRecisao } from "../../../shared/entity/contrato-recisao";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-contrato-recisao",
  templateUrl: "./contrato-recisao.component.html",
})
export class ContratoRecisaoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  protected title: string;
  protected page: Page<ContratoRecisao>;

  constructor(
    protected service: ContratoRecisaoService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((d) => {
      this.title = d.title;
    });

    this.service.paged().subscribe((data) => {
      this.page = data;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  pageChanged(event: any): void {
    this.service.paged(event.page - 1).subscribe((data) => {
      this.page = data;
    });
  }
}
