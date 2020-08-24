import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {

  title = '';
  message: string;
  footer: '';
  type = 'success';
  isConfirm = false;
  okText = "Ok";
  cancelText = "Cancelar";

  confirmResult : Subject<boolean>;


  constructor( public bsModalRef: BsModalRef) {}
  

  ngOnInit() {
   this.confirmResult = new Subject();
  }

  onClose(emit:boolean) {
    this.confirmResult.next(emit)
    this.bsModalRef.hide();
    if (document.body.classList.contains('dialog-open')) {
      document.body.classList.remove('dialog-open');
    }
  }

}
