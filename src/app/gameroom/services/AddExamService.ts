import { Injectable, Component } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class AddExamService {
    idRoom = "";
    questions = [];
  
    constructor() {
      
    }

    addQuestion(question:any) {
        this.questions.push(question);
    }

    removeQuestion(index) {
        this.questions.splice(index, 1);
    }

    getQuestions() {
        this.questions.forEach(function(question, index) {
            question.orden = index+1;
        });
        return this.questions;
    }

    clear() {
        this.idRoom = "";
        this.questions = [];
    }
  
  }