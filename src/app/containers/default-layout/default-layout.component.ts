import {Component, OnInit, Input } from '@angular/core';
import { navItems } from '../../_nav';
import { BaseFormComponent } from '../../shared/ui/base-form/base-form.component';
import { SharedService } from '../../shared/services/shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent extends BaseFormComponent implements OnInit {
  
  submit() {
    throw new Error("Method not implemented.");
  }
  
  
  public sidebarMinimized = false;
   navItems = navItems;

  constructor(private _sharedService : SharedService){
    super()
    this.formulario = this.builder.group({})
    _sharedService.changeEmitted$.subscribe(f=>{
      this.formulario = f
    })
  }
  
  ngOnInit(): void {
   /* this.service.list().subscribe(s =>{   
      this.navItems = s
    })*/
  }

  adicionado(e){
    console.log(e)
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  receiverForm(form){
    this.formulario = form
  }
}
