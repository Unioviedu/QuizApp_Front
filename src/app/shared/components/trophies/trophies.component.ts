import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.css']
})
export class TrophiesComponent implements OnInit {
  
  @Input()
  trophies: any[] = [];

  constructor() { }

  ngOnInit() {

  }

  getIcon(trophy:any) {
    return trophy.complete ? "assets/trophy.svg" : "assets/no-trophy.svg";
  }

}
