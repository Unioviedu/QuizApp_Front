import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OptionLineCode } from '../model/optionLineCode';
import { GenericQuestionComponent } from '../../generic-question/generic-question.component';

@Component({
  selector: 'app-create-question-complete-code',
  templateUrl: './create-question-complete-code.component.html',
  styleUrls: ['./create-question-complete-code.component.css']
})
export class CreateQuestionCompleteCodeComponent implements OnInit {
  @ViewChild(GenericQuestionComponent) genericQuestion: GenericQuestionComponent;
  @Output() newQuestionEvent: EventEmitter<any> = new EventEmitter();
  @Output() backEvent: EventEmitter<any> = new EventEmitter();

  contId: number;
  submitted: boolean;

  optionsForm: FormGroup;
  options: OptionLineCode[] = [];

  constructor() {
    this.contId = 1;
    let ol = new OptionLineCode(this.contId, 'Codigo1');
    this.options.push(ol);

    this.optionsForm = this.createForm();
  }

  ngOnInit() {
    this.genericQuestion.q.codeBlock.value = '%{Codigo1}%';
  }

  save() {
    this.submitted = true;
    this.genericQuestion.submitted = true;

    const questionForm = this.genericQuestion.questionForm;
    const optionsForm = this.optionsForm;

    if (questionForm.invalid || optionsForm.invalid) {
      return;
    }

    let linesCode = [];

    this.options.forEach(option => {
      let responses = [];
      option.responses.forEach(response => {
        responses.push(this.optionsForm.controls[response].value);
      });

      let newOption = {
        name: option.name,
        responses: responses
      }

      linesCode.push(newOption);
    });

    const newQuestion = {
      'title': this.genericQuestion.title,
      'statement': this.genericQuestion.statement,
      'type': 'completeCode',
      'linesCode': linesCode
    };

    this.newQuestionEvent.emit(newQuestion);
  }

  checkNewLineCode(text) {
    let options = [];
    let option = '';
    let record = false;
    let lastValue;

    text.split('').forEach(char => {
      if (lastValue == '}' && char == '%') {
        record = false;
        options.push(option.substring(0, option.length-1));
        option = '';
      }

      if (record) {
        option += char;
      }

      if (lastValue == '%' && char == '{') {
        record = true;
      }

      lastValue = char;
    });
    
    this.checkOptions(options);
  }

  checkOptions(newOptionsName) {
    let me = this;
    let newOptions = [];

    newOptionsName.filter((o, index) => newOptionsName.indexOf(o) == index).forEach(newOption => {
      let oldOption = me.options.find(o => o.name == newOption);

      if (oldOption) {
        newOptions.push(oldOption);
      } else {
        newOptions.push(this.createNewOption(newOption));
      }
    });

    this.options.forEach(option => {
      if (!newOptions.find(o => o.id == option.id)) {
        option.responses.forEach(response => {
          delete me.optionsForm.controls[response];
        });
      }
    });

    this.options = newOptions;
  }

  createNewOption(name) {
    let me = this;

    this.contId++;
    let option = new OptionLineCode(this.contId, name);

    option.responses.forEach(response => {
      me.optionsForm.controls[response] = new FormControl('', Validators.required);
    });

    return option;
  }

  createForm() {
    const group: any = {};

    this.options.forEach(option => {
      option.responses.forEach(response => {
        group[response] = new FormControl('', Validators.required);
      });
    });

    return new FormGroup(group);
  }

  addResponse(id: number) {
    let response = this.options.find(o => o.id === id).addResponse();
    this.optionsForm.controls[response] = new FormControl('', Validators.required);
  }

  removeResponse(id: number) {
    let response = this.options.find(o => o.id === id).removeResponse();
    delete this.optionsForm.controls[response];
  }

  getNgClass(response) {
    var o = this.optionsForm.controls;

    return { 'is-invalid': (o[response].touched || this.submitted) && o[response].errors };
  }

  getIfResponse(response, type) {
    const o = this.optionsForm.controls;

    if (type == 0) {
      return (o[response].touched || this.submitted) && o[response].errors;
    }

    else if (type == 1) {
      return o[response].errors.required;
    }
  }

  back() {
    this.backEvent.emit();
  }

}
