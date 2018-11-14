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

  isResponse:boolean = false;

  blocksOptions: any[] = [];
  blocksResponse: any[] = [];

  nameButton: string = "Qualify";

  constructor() {
    this.responseQuestionEvent = new EventEmitter();
    this.nextQuestionEvent = new EventEmitter();
  }

  ngOnInit() {
    this.loadData();
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
    let isCorrect = false;

    if (this.isResponse) {
      this.nextQuestion();
      return;
    }

    if (this.blocksResponse.length == this.data.codeBlocksCorrect.length) {
      isCorrect = this.compareResponse();
    }
    
    this.responseQuestionEvent.emit(isCorrect);
    this.isResponse = true;
    this.nameButton = this.data.isLast ? "Finalize" : "Next question";
  }

  nextQuestion() {
    this.nextQuestionEvent.emit(this.data.isLast);
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
    let cont = 0;
    for (let block of this.blocksResponse) {
      if (block.cod == cod) {
        this.blocksResponse.splice(cont, 1);
        this.blocksOptions.push(block);
      }

      cont++;
    }
  }

}
