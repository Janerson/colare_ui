import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../auth/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { BaseFormComponent } from "../../shared/ui/base-form/base-form.component";
import { AlertService, AlertTypes } from "../../shared/services/alert.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService  ) {
    super();
    if (this.authService.token) {
      this.router.navigate(["/DASHBOARD"]);
    }
  }

  ngOnInit(): void {
    this.formulario.addControl(
      "email",
      this.builder.control(null, [Validators.required, Validators.email])
    );
    this.formulario.addControl(
      "password",
      this.builder.control(null, [Validators.required])
    );
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "/DASHBOARD";
  }

  submit() {
    const email = this.formValue("email");
    const password = this.formValue("password");
    this.authService
      .login(email, password)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
         }
         ,
         () =>
           this.alertService.showToastr(
             AlertTypes.DANGER,
             "ERROR",
             "Usuário/senha inválido."
           )
      );
  }

  onFormInvalid() {
    this.alertService.showToastr(
      AlertTypes.DANGER,
      "ERROR",
      "Verifique os erros e tente novamente."
    );
  }

 
}
