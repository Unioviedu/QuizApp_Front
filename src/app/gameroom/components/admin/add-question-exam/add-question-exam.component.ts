import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddExamService } from '../../../services/AddExamService';

@Component({
  selector: 'app-add-question-exam',
  templateUrl: './add-question-exam.component.html',
  styleUrls: ['./add-question-exam.component.css']
})
export class AddQuestionExamComponent implements OnInit {
  idRoom: any;

  constructor(private router: Router, private addExamService: AddExamService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.idRoom = params['id'];
    });
  }

  ngOnInit() {
  }

  newQuestion(question) {
    this.addExamService.addQuestion(question);
    this.back();
  }

  back() {
    this.router.navigate( ['/addExam', this.idRoom] );
  }

}
