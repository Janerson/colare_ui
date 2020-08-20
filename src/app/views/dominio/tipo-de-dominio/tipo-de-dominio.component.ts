import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BaseFormComponent } from "../../../shared/ui/base-form/base-form.component";
import { Dominios } from "../../../shared/entity/colare/dominio";
import { Page } from "../../../shared/entity/api/page";
import { DominioService } from "../service/dominio.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription, interval } from "rxjs";
import { distinctUntilChanged, debounce, switchMap } from "rxjs/operators";

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
    this.service.uploadAPI(file[0], this.title).subscribe(null, () => {
      this._file.nativeElement.value = null;
    });
  }

  onValueChanged(){
    this.formulario.get("descricao")
    .valueChanges.pipe(
      distinctUntilChanged(),
      debounce(() => interval(250)),
      switchMap((value: any) => this.service.dominioPaginado(0, this.title, value))
    ).subscribe(
      (result: any) => {
        this.page = result;
      },
      (error: { message: string }) => console.log(error.message)
    );
  }
  
}
