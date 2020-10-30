import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  // tslint:disable-next-line
  selector: "body",
  template: `<div ngxUiLoaderBlurred>
      <router-outlet></router-outlet>
    </div>
    <ngx-ui-loader></ngx-ui-loader>`,
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
