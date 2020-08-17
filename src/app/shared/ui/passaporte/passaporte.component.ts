import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { TokenTcmService } from "../../services/token-tcm.service";
import { AuthTcm } from "../../entity/colare/auth-tcm";
import { CookieService } from "ngx-cookie-service";
import { EMPTY } from "rxjs";
import { AlertService } from "../../services/alert.service";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-passaporte",
  templateUrl: "./passaporte.component.html",
  styleUrls: ["./passaporte.component.css"],
})
export class PassaporteComponent implements OnInit, OnDestroy {
  authTcm: AuthTcm;
  isLogged = false;

  constructor(
    private modalService: ModalService,
    private tokenTcmService: TokenTcmService,
    private cookieService: CookieService,
    private alertService: AlertService,
    private bsMoldaRef: BsModalRef
  ) {}

  ngOnDestroy(): void {
    this.modalService.emitChange(EMPTY);
  }

  ngOnInit(): void {}

  login() {
    this.tokenTcmService.obterListaDeRespresentacoes().subscribe((data) => {
      this.isLogged = true;
      this.authTcm = data;
    });
  }

  onRepresentacaoChange(e) {
    this.tokenTcmService.obterToken(e).subscribe((data) => {
      this.setTokenTcmCookie(data.token.valor);
    });
  }

  setTokenTcmCookie(token) {
    let midnight = new Date();    
    midnight.setHours(23, 59, 59);
    this.cookieService.set("TCM_TOKEN", token, midnight);
    this.closeModal();
    this.alertService.showAlertSucess("Usário logado com sucesso!","Passaporte")
    //this.modalService.emitChange(e);
  }
  closeModal() {
    this.bsMoldaRef.hide();
  }
}
