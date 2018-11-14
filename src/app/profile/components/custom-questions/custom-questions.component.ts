import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-custom-questions',
  templateUrl: './custom-questions.component.html',
  styleUrls: ['./custom-questions.component.css']
})
export class CustomQuestionsComponent implements OnInit {
  questions = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.userService.getQuestionByUser().subscribe(
      questions => {
        this.questions = questions;
      },
      error => {
        
      }
    );
  }

}
