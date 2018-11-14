import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-generic-question',
  templateUrl: './generic-question.component.html',
  styleUrls: ['./generic-question.component.css']
})
export class GenericQuestionComponent implements OnInit {
  submitted: boolean;
  questionForm: any;

  nameToggleCode = "Mostrar";
  toggleCode:boolean;

  constructor(private formBuilder: FormBuilder) {
    this.questionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      statement: ['', [Validators.required]],
      codeBlock: ['', []],
      language: ['', []]
    });
  }

  ngOnInit() {
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

}
