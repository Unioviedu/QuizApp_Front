import { Component, OnInit, ViewChild } from '@angular/core';
import { GameRoomService } from '../../../services/GameRoomService';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../login/services/authentication.service';

declare var jQuery: any;

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  @ViewChild('myModal') myModal;
  rooms = [];

  isAdmin: boolean;

  constructor(private router: Router, private gameRoomService: GameRoomService,
    private authentication: AuthenticationService) { }

  ngOnInit() {
    this.checkRole();
  }

  checkRole() {
    var me = this;
    this.authentication.getUserRole().subscribe(
      role => {
        me.isAdmin = role === 'ADMIN';
        this.loadRooms();
      }
    );
  }

  loadRooms () {
    var me = this;

    if (this.isAdmin) {
      this.gameRoomService.findRoomsByAdmin().subscribe(
        rooms => {
          me.rooms = rooms;
        }
      );
    } else {
      this.gameRoomService.findRoomsByUser().subscribe(
        rooms => {
          me.rooms = rooms;
        }
      );
    }
  }

  newRoom() {
    jQuery(this.myModal.nativeElement).modal('hide');
    this.loadRooms();
  }

}
