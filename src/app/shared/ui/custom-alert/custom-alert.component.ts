import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {

  @Input() title = '';
  @Input() message: string;
  @Input() footer: '';
  @Input() type = 'success';

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  onClose() {
    this.bsModalRef.hide();
  }

}
