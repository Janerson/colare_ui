import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../auth/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs/operators';

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private authService: AuthenticationService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.token) {
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {
    this.loginForm = this.builder.group(
      {
        email: this.builder.control(null, [
          Validators.required,
          Validators.email,
        ]),
        password: this.builder.control(null, [Validators.required]),
      },
      [Validators.required]
    );
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';  
  }

  login() {
    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;
    this.authService.login(email, password)
    .pipe(first())
    .subscribe(resp => {     
      this.router.navigate([this.returnUrl])
    })
  }
}
