import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericQuestionComponent } from '../../generic-question/generic-question.component';

@Component({
  selector: 'app-create-question-option',
  templateUrl: './create-question-option.component.html',
  styleUrls: ['./create-question-option.component.css']
})
export class CreateQuestionOptionComponent implements OnInit {
  @ViewChild(GenericQuestionComponent) genericQuestion: GenericQuestionComponent;
  @Output() newQuestionEvent: EventEmitter<any> = new EventEmitter();
  @Output() backEvent: EventEmitter<any> = new EventEmitter();

  optionsForm: FormGroup;
  options: any = ['option0', 'option1'];
  contById = 1;

  submitted: boolean;
  isLastOption: boolean;
  isLastOptionCorrect: boolean;
  isAllOptionCorrect: boolean;

  constructor(private formBuilder: FormBuilder) {

    this.optionsForm = this.createForm();
  }

  ngOnInit() {
  }

  addOption() {
    this.isLastOption = false;
    this.contById++;
    let id = this.contById;

    this.optionsForm.controls['option' + id] = new FormControl('', Validators.required);
    this.optionsForm.controls['option' + id + 'isCorrect'] = new FormControl();
    this.options.push('option' + id);
  }

  removeOption(option) {
    var o = this.optionsForm.controls;
    this.isLastOption = false;

    if (this.options.length == 2) {
      this.isLastOption = true;
      return;
    }

    if (this.getNumCorrectOption() == 1 && o[option + 'isCorrect'].value) {
      this.isLastOptionCorrect = true;
      return;
    }

    delete o[option];
    delete o[option + 'isCorrect'];

    const index = this.options.indexOf(option);
    this.options.splice(index, 1);
  }

  changeIsCorrectOption(option) {
    var o = this.optionsForm.controls;
    this.closeAlert();

    const cont = this.getNumCorrectOption();

    if (o[option + 'isCorrect'].value) {

      if (cont === this.options.length) {
        this.isAllOptionCorrect = true;
        o[option+'isCorrect'].setValue(false);
      }

    } else {

      if (!(cont > 0)) {
        this.isLastOptionCorrect = true;
        o[option + 'isCorrect'].setValue(true);
      } 
    }
  }

  createForm() {
    const group: any = {};
    var cont = 0;

    this.options.forEach(option => {
      group[option] = new FormControl('', Validators.required);
      group[option + 'isCorrect'] = new FormControl();

      if (cont == 0) {
        group[option + 'isCorrect'].value = true;
      }

      cont++;
    });

    return new FormGroup(group);
  }

  save() {
    this.submitted = true;
    this.genericQuestion.submitted = true;

    const questionForm = this.genericQuestion.questionForm;
    const optionsForm = this.optionsForm;

    if (questionForm.invalid || this.checkOptionsForm(optionsForm)) {
      return;
    }

    const o = optionsForm.controls;

    const optionsObj = [];

    this.options.forEach(
      function (value) {
        const optionObj = {
          'value': o[value].value,
          'correct': o[value + 'isCorrect'].value
        };

        optionsObj.push(optionObj);
      }
    );

    const newQuestion = {
      'title': this.genericQuestion.title,
      'statement': this.genericQuestion.statement,
      'type': 'option',
      'options': optionsObj
    };

    this.newQuestionEvent.emit(newQuestion);
  }

  checkOptionsForm(optionsForm) {
    for (let option of optionsForm) {
      if (option.invalid)
        return true
    }
  }

  getNgClass(option) {
    var o = this.optionsForm.controls;

    return { 'is-invalid': (o[option].touched || this.submitted) && o[option].errors };
  }

  getIfOption(option, type) {
    const o = this.optionsForm.controls;

    if (type == 0) {
      return (o[option].touched || this.submitted) && o[option].errors
    }

    else if (type == 1) {
      return o[option].errors.required;
    }
  }

  getNumCorrectOption() {
    var o = this.optionsForm.controls;
    var cont = 0;

    this.options.forEach(
      function (option) {
        if (o[option + 'isCorrect'].value) {
          cont++;
        }
      }
    );

    return cont;
  }

  closeAlert() {
    this.isLastOption = false;
    this.isAllOptionCorrect = false;
    this.isLastOptionCorrect = false;
  }

  back() {
    this.backEvent.emit();
  }

}
