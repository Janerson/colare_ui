import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { MenuService } from "../../services/menu.service";
import { MenuLink } from "../../entity/api/menu-links";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  protected inavData: MenuLink;
  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.route.data.subscribe((d) => {
      let layout = d["spc"];
      this.menuService.consultaSPC(layout).subscribe((data) => {
        console.log(data)
        this.inavData = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
