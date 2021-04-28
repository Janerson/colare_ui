import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { JwtToken, JwtPayload } from "../shared/entity/api/jwt-token-api";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private options = {
    headers: {
      Authorization: environment.client_token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  };

  private _user: JwtPayload;

  private get _router() {
    return this._injector.get(Router);
  }

  get user() {
    this.decodeToken();
    return this._user;
  }

  constructor(
    private cookieService: CookieService,
    private _injector: Injector,
    private http: HttpClient
  ) {}

  public get token(): string {
    return this.cookieService.get("API_TOKEN");
  }

  login(username: string, password: string) {
    const payload = new HttpParams()
      .set("username", username)
      .set("password", password)
      .set("grant_type", "password");

    return this.http
      .post(environment.api_oauth_login, payload, this.options)
      .pipe(
        map((token: JwtToken) => {
          //this.jwtSubject.next(token);
          this.cookieService.set("API_TOKEN", token.access_token);
          this.startRefreshTokenTimer();

          return token;
        })
      );
  }

  logout() {
    this.http
      .delete(environment.api_oauth_logout, { withCredentials: true })
      .subscribe((a) => {
        this.stopRefreshTokenTimer();
        this.cookieService.delete("API_TOKEN");
        this.cookieService.delete("TCM_TOKEN");
        this._router.navigate(["/LOGIN"]);
        this._user = null;
      });
  }

  refreshToken() {
    const payload = new HttpParams().set("grant_type", "refresh_token");
    return this.http
      .post<any>(environment.api_oauth_login, payload, this.options)
      .pipe(
        map((refreshToken: JwtToken) => {
          this.cookieService.set("API_TOKEN", refreshToken.access_token);
          this.startRefreshTokenTimer();
          return refreshToken;
        })
      );
  }

  get accessToken(): Observable<any> {
    const httpHeaders = new HttpHeaders().append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    const body = new HttpParams()
      .set("grant_type", "password")
      .set("scope", "openid")
      .set("resource", "https://analysis.windows.net/powerbi/api")
      .set("client_id", "3558745c-4011-4bd7-8b5e-148e75bc1f85")
      .set("username", "paulo.hmsilva@bi.go.gov.br")
      .set("password", "@biPGE&2021");

    return this.http
      .post<any>(
        "https://login.windows.net/common/oauth2/token",
        body,
        this._options(httpHeaders)
      );
  }

  // helper methods
  private refreshTokenTimeout;

  private decodeToken() {
    // parse json object from base64 encoded jwt token
    this._user = JSON.parse(atob(this.token.split(".")[1]));
  }

  private startRefreshTokenTimer() {
    this.decodeToken();
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(this._user.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken().subscribe();
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  private _options(headers?: HttpHeaders, params?: HttpParams): {} {
    return {
      headers: headers ? headers : this.buildHeaders(),
      params: params ? params : this.buildParams(),
    };
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  private buildParams(): HttpParams {
    return new HttpParams();
  }
}
