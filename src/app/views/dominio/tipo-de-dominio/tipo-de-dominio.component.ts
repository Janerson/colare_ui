import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Dominios } from "../../../shared/entity/colare/dominio";
import { Page } from "../../../shared/entity/api/page";
import { DominioService } from "../service/dominio.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: "app-tipo-de-regulamentacao",
  templateUrl: "./tipo-de-dominio.component.html",
})
export class TipoDeDominioComponent extends BaseFormComponent
  implements OnInit {
  private subscription: Subscription;
  private serviceSubscription: Subscription;

  protected title: string;
  protected page: Page<Dominios>;
  @ViewChild("file") _file: ElementRef;

  constructor(
    protected service: DominioService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((d) => {
      this.title = d.title;
    });

    this.serviceSubscription = this.service.refresh.subscribe(() => {
      this.listar();
    });
    this.listar();
  }

  private listar() {
    this.service.dominioPaginado(0, this.title).subscribe((data) => {
      this.page = data;
    });
  }

  pageChanged(event: any): void {
    this.service.dominioPaginado(event.page - 1, this.title).subscribe((data) => {
      this.page = data;
    });
  }

  submit() {
    throw new Error("Method not implemented.");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }

  onFileChange(file: FileList) {
    this.service.uploadAPI(file[0], this.title).subscribe(null, (e) => {
      this._file.nativeElement.value = null;
    });
  }
}
