import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { PassaporteService } from "../../services/passaporte.service";

import { CookieService } from "ngx-cookie-service";
import { EMPTY } from "rxjs";
import { AlertService, AlertTypes } from "../../services/alert.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Passaporte } from '../../entity/colare/passaporte';

@Component({
  selector: "app-passaporte",
  templateUrl: "./passaporte.component.html",
  styleUrls: ["./passaporte.component.css"],
})
export class PassaporteComponent implements OnInit, OnDestroy {
  passporte: Passaporte;
  isLogged = false;

  constructor(
    private passaporteService: PassaporteService,
    private cookieService: CookieService,
    private alertService: AlertService,
    private bsMoldaRef: BsModalRef
  ) {}

  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {}

  login() {
    this.passaporteService.obterListaDeRespresentacoes().subscribe((data) => {
      this.isLogged = true;
      this.passporte = data;
    });
  }

  onRepresentacaoChange(e) {
    this.passaporteService.obterToken(e).subscribe((data) => {
      this.setTokenTcmCookie(data.token.valor);
    });
  }

  setTokenTcmCookie(token) {
    let midnight = new Date();    
    midnight.setHours(23, 59, 59);
    this.cookieService.set("TCM_TOKEN", token, midnight);
    this.closeModal();
    this.alertService.showAlert(AlertTypes.SUCESS,"Usário logado com sucesso!","Passaporte")    
  }
  closeModal() {
    this.bsMoldaRef.hide();
  }
}
