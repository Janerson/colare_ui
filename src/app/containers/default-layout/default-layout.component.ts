import {Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { navItems } from '../../_nav';
import { BaseFormComponent } from '../../shared/ui/base-form/base-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent extends BaseFormComponent implements OnInit {
  public sidebarMinimized = false;
   navItems = navItems;

  constructor(){
    super()
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
