import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input() room: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showRoom() {
    this.router.navigate( ['/room', this.room.id] );
  }

}
