import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-complete-code',
  templateUrl: './question-complete-code.component.html',
  styleUrls: ['./question-complete-code.component.css']
})
export class QuestionCompleteCodeComponent implements OnInit {
  @Input() data: any;
  @Output() responseQuestionEvent: EventEmitter<boolean>;
  @Output() nextQuestionEvent: EventEmitter<boolean>;

  isResponse: boolean;
  nameButton: string = "Correguir!";
  response: any = {};

  constructor() {
    this.responseQuestionEvent = new EventEmitter();
    this.nextQuestionEvent = new EventEmitter();
  }

  ngOnInit() {
    this.data.linesCode.forEach((line, index) => {
      this.response[index] = "";
    });
  }

  qualify() {
    let isCorrect = true;

    if (this.isResponse) {
      this.nextQuestion();
      return;
    }

    this.data.linesCode.forEach( (line, index) => {
      let response = this.response[index];
      
      let result = false;
      line.responses.forEach( (correct) => {
        if (response.localeCompare(correct) == 0) {
          result = true;
        }
      });

      isCorrect = result;
    })
    
    this.responseQuestionEvent.emit(isCorrect);
    this.isResponse = true;
    this.nameButton = this.data.isLast ? "Ver resultados" : "Siguiente";
  }

  nextQuestion() {
    this.nextQuestionEvent.emit(this.data.isLast);
  }

  get button() {
    return this.nameButton;
  }

}
