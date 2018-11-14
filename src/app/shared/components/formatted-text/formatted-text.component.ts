import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formatted-text',
  templateUrl: './formatted-text.component.html',
  styleUrls: ['./formatted-text.component.css']
})
export class FormattedTextComponent implements OnInit {

  @Input() data: any;

  constructor() {
   
   }

  ngOnInit() {
  }

}
