import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { TokenTcmService } from "../../services/token-tcm.service";
import { AuthTcm } from "../../entity/colare/auth-tcm";
import { CookieService } from 'ngx-cookie-service';
import { EMPTY } from 'rxjs';

@Component({
  selector: "app-passaporte",
  templateUrl: "./passaporte.component.html",
  styleUrls: ["./passaporte.component.css"],
})
export class PassaporteComponent implements OnInit, OnDestroy{
  authTcm: AuthTcm;
  isLogged = false;

  constructor(
    private modalService: ModalService,
    private tokenTcmService: TokenTcmService,
    private cookieService: CookieService
  ) {}

  ngOnDestroy(): void {
    this.modalService.emitChange(EMPTY)
  }

  ngOnInit(): void {
   
  }

  login() {
    this.tokenTcmService.obterListaDeRespresentacoes().subscribe((data) => {
      this.isLogged = true;
      this.authTcm = data;
    });
  }

  //TODO - Testar com token
  onRepresentacaoChange(e) {
    let midnight = new Date();
    midnight.setHours(23,59,59,0);
    this.cookieService.set('TCM_TOKEN', 'TOKEN VALOR', midnight, '/','localhost', true, "Strict");
    this.modalService.emitChange(e);
  }
  
}
