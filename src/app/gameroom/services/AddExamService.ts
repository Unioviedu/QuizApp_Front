import { Injectable, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

    clear() {
        this.idRoom = "";
        this.questions = [];
    }
  
  }