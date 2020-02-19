import {Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
   navItems = navItems;

  constructor(){
  }
  
  ngOnInit(): void {
   /* this.service.list().subscribe(s =>{   
      this.navItems = s
    })*/
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
