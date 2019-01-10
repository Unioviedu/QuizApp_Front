import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddExamService } from '../../../services/AddExamService';

@Component({
  selector: 'app-add-question-exam',
  templateUrl: './add-question-exam.component.html',
  styleUrls: ['./add-question-exam.component.css']
})
export class AddQuestionExamComponent implements OnInit {

  constructor(private router: Router, private addExamService: AddExamService) { }

  ngOnInit() {
  }

  newQuestion(question) {
    this.addExamService.addQuestion(question);
    this.back();
  }

  back() {
    this.router.navigate( ['/addExam'] );
  }

}
