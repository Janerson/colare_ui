import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Dominios } from "../../../shared/entity/colare/dominio";
import { Page } from "../../../shared/entity/api/page";
import { DominioService } from "../service/dominio.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable, interval, empty } from "rxjs";
import { AlertService } from "../../../shared/services/alert.service";
import { distinctUntilChanged, debounce, switchMap, tap } from "rxjs/operators";

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

    this.formulario.addControl("descricao", this.builder.control(null, []));
    this.onValueChanged();
  }

  private listar() {
    this.service.dominioPaginado(0, this.title).subscribe((data) => {
      this.page = data;
    });
  }

  pageChanged(event: any): void {
    this.service
      .dominioPaginado(event.page - 1, this.title, this.formValue("descricao"))
      .subscribe((data) => {
        this.page = data;
      });
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

  onValueChanged(){
    this.formulario.get("descricao")
    .valueChanges.pipe(
      tap(v => console.log(v)),
      distinctUntilChanged(),
      debounce(() => interval(500)),
      switchMap((value: any) => (value !== "" ?  this.service.dominioPaginado(0, this.title, value) : empty()))
    ).subscribe(
      (result: any) => {
        console.log(result);
        this.page = result;
      },
      (error: { message: string }) => console.log(error.message)
    );
  }
  
}
