import { DefaultUrlSerializer, UrlTree } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

export function appInitializer(authenticationService: AuthenticationService) {
  return () =>
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      authenticationService.refreshToken().subscribe().add(resolve);
    });
}

export class UpperCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    return super.parse(url.toUpperCase());
  }
}
