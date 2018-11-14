import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rank-level',
  templateUrl: './rank-level.component.html',
  styleUrls: ['./rank-level.component.css']
})
export class RankLevelComponent implements OnInit {
  
  @Input()
  levelRank: any = {};

  constructor() { }

  ngOnInit() {
  }

}
