import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OptionCodeBlock } from '../model/optionCodeBlock';
import { GenericQuestionComponent } from '../../generic-question/generic-question.component';

@Component({
  selector: 'app-create-question-code-block',
  templateUrl: './create-question-code-block.component.html',
  styleUrls: ['./create-question-code-block.component.css']
})
export class CreateQuestionCodeBlockComponent implements OnInit {
  iconNoCorrectOption = 'fa fa-star-o';
  iconCorrectOption = 'fa fa-star';

  @ViewChild(GenericQuestionComponent) genericQuestion: GenericQuestionComponent;
  @Output() newQuestionEvent: EventEmitter<any> = new EventEmitter();

  contById = 0;
  options: OptionCodeBlock[] = [];
  correctOptions: OptionCodeBlock[] = [];
  questionForm: FormGroup;
  optionsForm: FormGroup;

  submitted: boolean;
  isLastOption: boolean;
  isLastOptionCorrect: boolean;

  constructor(private formBuilder: FormBuilder) {
    const firstOption = new OptionCodeBlock(this.contById);
    this.contById++;
    const secondOption = new OptionCodeBlock(this.contById);
    secondOption.icon = this.iconNoCorrectOption;

    this.options.push(firstOption);
    this.options.push(secondOption);
    this.optionsForm = this.createForm();
    this.convertInCorrect(firstOption);
  }

  ngOnInit() {
  }

  convertInCorrect(option) {
    const indexCorrect = this.correctOptions.indexOf(option);

    if (indexCorrect === -1) {
      this.correctOptions.push(option);
      const value = this.optionsForm.controls[option.id].value;
      this.optionsForm.controls['correct' + option.id] = new FormControl('');
      this.optionsForm.controls['correct' + option.id].setValue(value);
      
      const index = this.options.indexOf(option);
      this.options[index].icon = this.iconCorrectOption;
    }
  }

  onOptionChange(value, option) {
    const index = this.correctOptions.indexOf(option);

    if (index > -1) {
      this.optionsForm.controls['correct' + option.id].setValue(value);
    }
  }

  removeOption(option) {
    if (this.options.length == 2) {
      this.isLastOption = true;
      return;
    }

    let index = this.options.indexOf(option);
    this.options.splice(index, 1);
    delete this.optionsForm.controls[option.id];

    index = this.correctOptions.indexOf(option);

    if (index > -1) {
      this.correctOptions.splice(index, 1);
      delete this.optionsForm.controls['correct' + option.id];
    }
  }

  addOption() {
    this.contById++;
    
    const option = new OptionCodeBlock(this.contById);
    option.icon = this.iconNoCorrectOption;
    this.optionsForm.controls[option.id] = new FormControl('', Validators.required);

    this.options.push(option);
  }

  removeCorrectOption(option) {
    if (this.correctOptions.length == 1) {
      this.isLastOptionCorrect = true;
      return;
    }
    let index = this.correctOptions.indexOf(option);

    this.correctOptions.splice(index, 1);
    delete this.optionsForm.controls['correct' + option.id];

    index = this.options.indexOf(option);
    this.options[index].icon = this.iconNoCorrectOption;
  }

  createForm() {
    const group: any = {};

    this.options.forEach(option => {
      group[option.id] = new FormControl('', Validators.required);
    });

    return new FormGroup(group);
  }

  save() {
    this.submitted = true;
    this.genericQuestion.submitted = true;

    const questionForm = this.genericQuestion.questionForm;
    const optionsForm = this.optionsForm;

    if (questionForm.invalid || optionsForm.invalid) {
      return;
    }

    const q = questionForm.controls;
    const o = optionsForm.controls;

    const optionsObj = [];
    const correctOptionsObj = [];

    this.options.forEach(
      function(option) {
        const value = o[option.id].value;
        optionsObj.push(value);
      }
    );

    this.correctOptions.forEach(
      function(correctOption) {
        const value = o['correct' + correctOption.id].value;
        correctOptionsObj.push(value);
      }
    );

    const withCode = this.genericQuestion.toggleCode;

    const newQuestion = {
      'title': q.title.value,
      'statement': q.statement.value,
      'type': 'codeBlock',
      'codeBlock': withCode ? q.codeBlock.value : null,
      'programmingLanguage': withCode ? q.language.value : null,
      'codeBlocksOptions': optionsObj,
      'codeBlocksCorrect': correctOptionsObj
    };

    this.newQuestionEvent.emit(newQuestion);

  }

  getIfOption(id, type) {
    const o = this.optionsForm.controls;

    if (type == 0) {
      return (o[id].touched || this.submitted) && o[id].errors;
    }

    else if (type == 1) {
      return o[id].errors.required;
    }
  }

  getNgClass(id) {
    var o = this.optionsForm.controls;

    return { 'is-invalid': (o[id].touched || this.submitted) && o[id].errors };
  }

  closeAlert() {
    this.isLastOption = false;
    this.isLastOptionCorrect = false;
  }

  get q() {
    return this.questionForm.controls;
  }

}
