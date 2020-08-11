import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../auth/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { BaseFormComponent } from "../../shared/ui/base-form/base-form.component";

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
    private router: Router
  ) {
    super();
    if (this.authService.token) {
      this.router.navigate(["/dashboard"]);
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
      this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  }

  submit() {
    const email = this.formValue('email');
    const password = this.formValue("password");
    this.authService
      .login(email, password)
      .pipe(first())
      .subscribe((resp) => {
        this.router.navigate([this.returnUrl]);
      });
  }
}
