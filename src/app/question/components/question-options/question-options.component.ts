import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.css']
})
export class QuestionOptionsComponent implements OnInit{
  OPTION_CLASS: string = "list-group-item list-group-item-action";
  OPTION_CLASS_ACTIVE: string = "list-group-item list-group-item-action active";

  OPTION_CLASS_CORRECT: string = "list-group-item list-group-item-action list-group-item-success";
  OPTION_CLASS_INCORRECT: string = "list-group-item list-group-item-action list-group-item-danger";

  @Input() data: any;
  @Output() responseQuestionEvent: EventEmitter<boolean>;
  @Output() nextQuestionEvent: EventEmitter<boolean>;
  @Output() backQuestionEvent: EventEmitter<boolean>;

  cont: number = 0;
  optionsSelected: number = 0;
  options: any[] = [];
  isResponse: boolean = false;
  nameButton: string = "Corregir!";

  constructor() {
    this.responseQuestionEvent = new EventEmitter();
    this.nextQuestionEvent = new EventEmitter();
    this.backQuestionEvent = new EventEmitter();
  }

  ngOnInit() {
    this.loadOptionsClass();

    if(this.data.response) {
      this.loadResponse();
    }
  }

  loadResponse() {
    this.options = this.data.response.options;
  }

  loadOptionsClass() {
    for (let option of this.data.options) {
      if (option.correct)
        this.cont++;

      let optionObj = {
        "value": option.value,
        "classOption": this.OPTION_CLASS,
        "selected": false,
        "correct": option.correct
      }

      this.options.push(optionObj);
    }
  }

  response(index: number) {
    if (this.isResponse)
      return;

    let optionObj = this.options[index];

    if (this.cont == 1) {
      this.clearAllOptions();
    }

    if (optionObj.selected) {
      optionObj.classOption = this.OPTION_CLASS;
      optionObj.selected = false;
      this.optionsSelected--;
    } else if (this.optionsSelected != this.cont) {
      optionObj.classOption = this.OPTION_CLASS_ACTIVE;
      optionObj.selected = true;
      this.optionsSelected++;
    }

  }

  clearAllOptions() {
    for (let option of this.options) {
      option.classOption = this.OPTION_CLASS;
      option.selected = false;
      this.optionsSelected = 0;
    }
  }

  getOption(index: number) {
    return this.data.options[index].value;
  }

  qualify() {

    if (this.isResponse) {
      this.nextQuestion();
      return;
    }

    let isCorrect = this.isCorrect();

    this.responseQuestionEvent.emit(isCorrect);
    this.markQuestion(isCorrect);
    this.isResponse = true;

    this.nameButton = this.data.isLast ? "Finalizar" : "Siguiente pregunta";
  }
  
  isCorrect() {
    let isCorrect = true;
    for (let option of this.options) {
      if (option.correct != option.selected) {
        isCorrect = false;
        break;
      }
    }

    return isCorrect;
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
      options: this.options,
      isCorrect: this.isCorrect
    };
  }

  markQuestion(isCorrect: boolean) {
    for (let option of this.options) {
      if (option.correct)
        option.classOption = isCorrect ? this.OPTION_CLASS_CORRECT : this.OPTION_CLASS_INCORRECT;
    }
  }

}
