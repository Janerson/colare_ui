import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html'

})
export class AlertModalComponent implements OnInit {
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
