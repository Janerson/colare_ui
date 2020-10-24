import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'c-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent implements OnInit {

  @Input() faIcon = "fa fa-edit"
  @Input() cardTitle = ""
  @Input() style =""

  constructor() { }

  ngOnInit(): void {
  }

}
