import { Component, OnInit, ViewChild } from '@angular/core';
import { GameRoomService } from '../../../services/GameRoomService';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  @ViewChild('myModal') myModal;
  rooms = [];

  constructor(private router: Router, private gameRoomService: GameRoomService) { }

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms () {
    var me = this;

    this.gameRoomService.findRoomsByAdmin().subscribe(
      rooms => {
        me.rooms = rooms;
      }
    )
  }

  newRoom() {
    jQuery(this.myModal.nativeElement).modal('hide');
    this.loadRooms();
  }

}
