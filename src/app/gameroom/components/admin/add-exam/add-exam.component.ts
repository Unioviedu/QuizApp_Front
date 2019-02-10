import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddExamService } from '../../../services/AddExamService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GameRoomService } from '../../../services/GameRoomService';
import {IMyDpOptions} from 'mydatepicker';

import * as moment from 'moment';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {
      su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'
    },
    monthLabels:{ 
      1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' 
    },
    todayBtnTxt: 'Hoy'
  };

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
    if (this.addExamService.creating) {
      this.loadInfo();
    } else {
      this.addExamService.creating = true;
    }
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

  addQuestionEvent() {
    this.saveInfo();
  }

  saveInfo() {
    var info = {
      beginDate: this.beginDate,
      finishDate: this.finishDate,
      title: this.examForm.controls['title'].value,
      description: this.examForm.controls['description'].value
    };

    this.addExamService.info = info;
  }

  loadInfo() {
    this.beginDate = this.addExamService.info.beginDate;
    this.finishDate = this.addExamService.info.finishDate;
    this.examForm.controls['title'].setValue(this.addExamService.info.title);
    this.examForm.controls['description'].setValue(this.addExamService.info.description); 
  }

  finish() {
    let idRoom = this.addExamService.idRoom;
    this.addExamService.clear();
    this.router.navigate( ['/room', idRoom] );
  }

  

}
