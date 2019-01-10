import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameRoomService } from '../../../services/GameRoomService';
import { AddExamService } from '../../../services/AddExamService';

@Component({
  selector: 'app-view-room-admin',
  templateUrl: './view-room-admin.component.html',
  styleUrls: ['./view-room-admin.component.css']
})
export class ViewRoomAdminComponent implements OnInit {
  idRoom: string;
  room: any = {};

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameRoomService: GameRoomService,
    private addExamService: AddExamService) {

    this.activatedRoute.params.subscribe(params => {
      this.idRoom = params['id'];
    });

    addExamService.idRoom = this.idRoom;
  }

  ngOnInit() {
    this.loadRoom();
  }

  loadRoom() {
    var me = this;

    this.gameRoomService.findRoomById(this.idRoom).subscribe(
      room => {
        console.log(room);
        me.room = room;
      }
    )
  }

  addExam() {
    this.router.navigate( ['/addExam'] );
  }

}
