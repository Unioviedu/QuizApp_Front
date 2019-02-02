import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-generic-question',
  templateUrl: './generic-question.component.html',
  styleUrls: ['./generic-question.component.css']
})
export class GenericQuestionComponent implements OnInit {
  @Output() onChangeCodeBlock: EventEmitter<string>;

  submitted: boolean;
  questionForm: any;

  nameToggleCode = "Mostrar";
  toggleCode: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.onChangeCodeBlock = new EventEmitter();
    this.questionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      statement: ['', [Validators.required]],
      codeBlock: ['', []],
      language: ['', []]
    });
  }

  ngOnInit() {

    this.onChanges();
  }

  onChanges() {
    this.questionForm.get('codeBlock').valueChanges.subscribe(value => {
      this.onChangeCodeBlock.emit(value);
    });
  }

  toggleCodeBlock() {
    if (this.toggleCode) {
      this.nameToggleCode = "Mostrar";
      this.toggleCode = false;
    } else {
      this.nameToggleCode = "Ocultar";
      this.toggleCode = true;
    }
  }

  get q() {
    return this.questionForm.controls;
  }

  get title() {
    return this.q.title.value;
  }

  get statement() {
    let blocks = [];

    blocks.push(this.createTextSection(this.q.statement.value));

    if (this.q.codeBlock.value) {
      blocks.push(this.createCodeSection(this.q.codeBlock.value, this.q.language.value));
    }

    return {
      blocks: blocks
    }
  }

  createTextSection(text) {
    let textSection = {
      type: 'textSection',
      content: text
    }

    return textSection;
  }

  createCodeSection(text, language) {
    let codeSection = {
      type: 'codeSection',
      content: text,
      programmingLanguage: language
    }

    return codeSection;
  }

}
