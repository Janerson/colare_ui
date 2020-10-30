import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "base-modal",
  templateUrl: "./base-modal.component.html",
  styleUrls: ["./base-modal.component.css"],
})
export class BaseModalComponent implements OnInit, AfterViewInit {
 
  /**
   * Dados são recebidos via ModalOptions, na propriedade initialState
   */
  title = "Enviar dados Colare";
  component: any;
  data:any
  private idModal:number

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private bsModalService: BsModalService,
    //public bsModalRef: BsModalRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.idModal = this.bsModalService.config.id
  }
  
  ngAfterViewInit() {
    this.loadComponent();    
  }

  loadComponent() {
     const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
     const ref = this.container.createComponent(factory);
     ref.instance['data'] = this.data
     ref.changeDetectorRef.detectChanges();     
  }

  onClose() {
    //this.bsModalRef.hide();
    this.bsModalService.hide(this.idModal)
    // if (document.body.classList.contains('modal-open')) {
    //   document.body.classList.remove('modal-open');
    // }
  }
}
