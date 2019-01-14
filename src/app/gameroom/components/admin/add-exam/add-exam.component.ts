import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddExamService } from '../../../services/AddExamService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GameRoomService } from '../../../services/GameRoomService';

import * as moment from 'moment';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  idRoom: any;
  questions = [];
  examForm: FormGroup;

  beginDate: any;
  finishDate: any;

  constructor(private router: Router, private addExamService: AddExamService,
    private formBuilder: FormBuilder, private gameRoomService: GameRoomService,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params.subscribe(params => {
        this.idRoom = params['id'];
      });

    this.examForm = this.formBuilder.group({
      title: ['', []],
      description: ['', []]
    });
  }

  ngOnInit() {
    
  }

  save() {
    var me = this;
    let beginDate = moment(this.beginDate.jsdate).format('YYYY-MM-DD').toString();
    let finishDate = moment(this.finishDate.jsdate).format('YYYY-MM-DD').toString();

    var exam = {
      idRoom: this.idRoom,
      title: this.examForm.controls['title'].value,
      description: this.examForm.controls['description'].value,
      exercises: this.addExamService.getQuestions(),
      beginDate: beginDate,
      finishDate: finishDate
    }

    this.gameRoomService.createNewExam(exam).subscribe(
      result => {
        me.finish();
      }
    );
  }

  finish() {
    let idRoom = this.addExamService.idRoom;
    this.addExamService.clear();
    this.router.navigate( ['/room', idRoom] );
  }

  

}
