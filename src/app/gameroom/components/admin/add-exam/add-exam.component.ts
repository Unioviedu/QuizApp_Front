import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AddExamService } from '../../../services/AddExamService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GameRoomService } from '../../../services/GameRoomService';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  questions = [];
  examForm: FormGroup;

  es: any;
  beginDate: Date;
  finishDate: Date;

  constructor(private router: Router, private addExamService: AddExamService,
    private formBuilder: FormBuilder, private gameRoomService: GameRoomService) {

    this.examForm = this.formBuilder.group({
      title: ['', []],
      description: ['', []]
    });
  }

  ngOnInit() {
    this.es = {
      closeText: "Cerrar",
      prevText: "Anterior",
      nextText: "Siguiente",
      monthNames: ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      weekHeader: "Semana",
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",
      timeOnlyTitle: "Solo hora",
      timeText: "Tiempo",
      hourText: "Hora",
      minuteText: "Minuto",
      secondText: "Segundo",
      currentText: "Fecha actual",
      ampm: false,
      month: "Mes",
      week: "Semana",
      day: "Día",
      allDayText : "Todo el día"
  };
  }

  save() {
    var me = this;

    let moment = require('moment');
    let beginDate = moment(this.beginDate).format('YYYY-MM-DD').toString();
    let finishDate = moment(this.finishDate).format('YYYY-MM-DD').toString();

    var exam = {
      idRoom: this.addExamService.idRoom,
      title: this.examForm.controls['title'].value,
      description: this.examForm.controls['description'].value,
      exercises: this.addExamService.questions,
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
