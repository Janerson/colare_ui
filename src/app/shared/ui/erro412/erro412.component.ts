import { Component, OnInit, Input } from "@angular/core";
import { Erro412, Mensagens, ErroValidacao } from "../../entity/colare/colare-erro";
import { data } from "jquery";

@Component({
  selector: "erro412",
  templateUrl: "./erro412.component.html",
  styleUrls: ["./erro412.component.css"],
})
export class Erro412Component implements OnInit {
  data: any;
  erro412: Erro412[];
  erroMensagem: ErroValidacao;

  constructor() {}

  ngOnInit(): void {
    Array.isArray(this.data)
      ? (this.erro412 = this.data)
      : (this.erroMensagem = this.data); 

      console.log("erroMensagem",this.erroMensagem)
  }
}
