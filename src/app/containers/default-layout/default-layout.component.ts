import {Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BaseEntity } from '../../services/generic/base-entity';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
   navItems:BaseEntity[]// = navItems;

  constructor(private service:MenuService){
  }
  
  ngOnInit(): void {
    this.service.list().subscribe(s =>{   
      this.navItems = s
    })
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
