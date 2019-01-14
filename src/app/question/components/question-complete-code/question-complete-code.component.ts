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
  @Output() backQuestionEvent: EventEmitter<boolean>;

  isResponse: boolean;
  nameButton: string = "Correguir!";
  response: any = {};

  constructor() {
    this.responseQuestionEvent = new EventEmitter();
    this.nextQuestionEvent = new EventEmitter();
    this.backQuestionEvent = new EventEmitter();
  }

  ngOnInit() {
    this.data.linesCode.forEach((line, index) => {
      this.response[index] = "";
    });

    if (this.data.response) {
      this.response = this.data.response.lines;
    }
  }

  qualify() {

    if (this.isResponse) {
      this.nextQuestion();
      return;
    }

    let isCorrect = this.compareResponse();
    
    this.responseQuestionEvent.emit(isCorrect);
    this.isResponse = true;
    this.nameButton = this.data.isLast ? "Ver resultados" : "Siguiente";
  }

  nextQuestion() {
    this.data.response = this.prepareResponse();
    this.nextQuestionEvent.emit(this.data);
  }

  backQuestion() {
    this.data.response = this.prepareResponse();
    this.backQuestionEvent.emit(this.data);
  }

  prepareResponse() {
    return {
      lines: this.response,
      isCorrect: this.compareResponse()
    };
  }

  compareResponse():boolean {
    let isCorrect = true;

    this.data.linesCode.forEach( (line, index) => {
      let response = this.response[index];
      
      let result = false;
      line.responses.forEach( (correct) => {
        if (response.localeCompare(correct) == 0) {
          result = true;
        }
      });

      isCorrect = result && isCorrect;
    });

    return isCorrect;
  }

  get button() {
    return this.nameButton;
  }

}
