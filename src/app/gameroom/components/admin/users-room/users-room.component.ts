import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-users-room',
  templateUrl: './users-room.component.html',
  styleUrls: ['./users-room.component.css']
})
export class UsersRoomComponent implements OnInit {
  @Input() users: string[];

  constructor() { }

  ngOnInit() {
  }

}
