import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-code-block',
  templateUrl: './question-code-block.component.html',
  styleUrls: ['./question-code-block.component.css']
})
export class QuestionCodeBlockComponent implements OnInit {

  @Input() data: any;
  @Output() responseQuestionEvent: EventEmitter<boolean>;
  @Output() nextQuestionEvent: EventEmitter<boolean>;
  @Output() backQuestionEvent: EventEmitter<boolean>;

  isResponse:boolean = false;
  isCorrect: boolean = false;

  blocksOptions: any[] = [];
  blocksResponse: any[] = [];

  nameButton: string = "Corregir!";

  constructor() {
    this.responseQuestionEvent = new EventEmitter();
    this.nextQuestionEvent = new EventEmitter();
    this.backQuestionEvent = new EventEmitter();
  }

  ngOnInit() {
    this.loadData();

    if (this.data.response) {
      this.blocksOptions = this.data.response.blocksOptions;
      this.blocksResponse = this.data.response.blocksResponse;
    }
  }

  loadData() {
    let cont = 0;
    for (let codeBlock of this.data.codeBlocksOptions) {
      let codeObj = {
        "cod": cont,
        "value": codeBlock
      }

      this.blocksOptions.push(codeObj);
      cont++;
    }
    this.blocksResponse = [];
  }

  qualify() {
    if (this.isResponse) {
      this.nextQuestion();
      return;
    }

    if (this.blocksResponse.length == this.data.codeBlocksCorrect.length) {
      this.isCorrect = this.compareResponse();
    }
    this.markQuestion();
    this.responseQuestionEvent.emit(this.isCorrect);
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
      blocksOptions: this.blocksOptions,
      blocksResponse: this.blocksResponse,
      isCorrect: this.compareResponse()
    };
  }

  compareResponse():boolean {
    let i = 0;
    for (let block of this.blocksResponse) {
      if (block.value != this.data.codeBlocksCorrect[i]) {
        return false;
      }

      i++;
    }

    return true;
  }

  getNameOption(i: number) {
    this.blocksOptions[i];
  }

  addBlock(cod: number) {
    if (this.isResponse)
      return;

    let cont = 0;
    for (let block of this.blocksOptions) {
      if (block.cod == cod) {
        this.blocksResponse.push(block);
        this.blocksOptions.splice(cont, 1);
      }

      cont++;
    }
  }

  removeBlock(cod: number) {
    if (this.isResponse)
      return;

    let cont = 0;
    for (let block of this.blocksResponse) {
      if (block.cod == cod) {
        this.blocksResponse.splice(cont, 1);
        this.blocksOptions.push(block);
      }

      cont++;
    }
  }

  markQuestion() {
    if (!this.isCorrect) {
      this.blocksResponse = []
      for (let block of this.data.codeBlocksCorrect) {
        this.blocksResponse.push({
          code: "",
          value: block
        });
      }
    }
  }

  getClassResponse() {
    if( this.isResponse && !this.isCorrect)
      return 'btn btn-danger';
    else if (this.isResponse && this.isCorrect)
      return 'btn btn-success';
    else
      return 'btn btn-secondary'
  }

}
