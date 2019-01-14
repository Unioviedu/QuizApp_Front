import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameRoomService } from '../../../services/GameRoomService';
import { AddExamService } from '../../../services/AddExamService';
import * as moment from 'moment';
import { AuthenticationService } from '../../../../login/services/authentication.service';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {
  isAdmin: boolean;

  idRoom: string;
  room: any = {};

  filtersMap = {};
  examsFilter = [];

  directionSort: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameRoomService: GameRoomService,
    private addExamService: AddExamService,
    private authentication: AuthenticationService) {

    this.checkUserRole()

    this.activatedRoute.params.subscribe(params => {
      this.idRoom = params['id'];
    });

    addExamService.idRoom = this.idRoom;
  }

  ngOnInit() {
    this.loadRoom();
  }

  checkUserRole() {
    var me = this;
    this.authentication.getUserRole().subscribe(
      role => {
        me.isAdmin = role == 'ADMIN';
      }
    );
  }

  loadRoom() {
    var me = this;

    this.gameRoomService.findRoomById(this.idRoom).subscribe(
      room => {
        me.room = room;
        me.examsFilter = room.exams;
        me.sort('date', 'up');
      }
    );
  }

  addExam() {
    this.router.navigate(['/addExam', this.idRoom]);
  }

  addFilter(filter, value) {
    let me = this;
    this.examsFilter = this.room.exams;

    this.filtersMap[filter] = value;

    this.examsFilter = this.examsFilter.filter(function (exam) {
      var resultFilter = true;
      for (let [filter, value] of Object.entries(me.filtersMap)) {

        if (filter == 'title') {
          let condition = value == "" ? true : exam.title.toLowerCase().includes(value.toString().toLowerCase());
          resultFilter = resultFilter && condition;
        }

        if (filter == 'active') {
          let condition = value ? exam.state === "ACTIVE" : true;
          resultFilter = resultFilter && condition;
        }
      }

      return resultFilter;
    });
  }

  sort(critery, direction) {
    this.directionSort = direction;
    this.examsFilter = this.examsFilter.sort(function (exam1, exam2) {
      if (moment(exam1.beginDate).isBefore(exam2.beginDate))
        return direction == 'up' ? 1 : -1;
      else if (moment(exam1.beginDate).isAfter(exam2.beginDate))
        return direction == 'up' ? -1 : 1;
      else
        return 0;
    });
  }

}
