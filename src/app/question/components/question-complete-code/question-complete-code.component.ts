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
  isCorrect: boolean;
  nameButton: string = "Corregir!";
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

    this.isCorrect = this.compareResponse();

    this.responseQuestionEvent.emit(this.isCorrect);
    this.markQuestion();
    this.isResponse = true;
    this.nameButton = this.data.isLast ? "Finalizar" : "Siguiente pregunta";
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

  compareResponse(): boolean {
    let isCorrect = true;

    this.data.linesCode.forEach((line, index) => {
      let response = this.response[index].replace(/ /g, "");

      isCorrect = this.compareOneAnswer(line, response) && isCorrect;
    });

    return isCorrect;
  }

  compareOneAnswer(line, response) {
    let result = false;
    line.responses.forEach((correct) => {
      if (response.localeCompare(correct.replace(/ /g, "")) == 0) {
        result = true;
      }
    });

    return result
  }

  markQuestion() {
    if (!this.isCorrect) {
      this.data.linesCode.forEach((line, index) => {
        if (!this.compareOneAnswer(line, this.response[index])) {
          this.response[index] += "\n" + "CORRECTO: " + line.responses[0]
        }
      });
    }
  }

  get button() {
    return this.nameButton;
  }

}
