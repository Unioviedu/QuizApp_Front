import { Injectable, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Section } from '../model/section.model';
import { Level } from '../model/level.model';
import { QuestionDuo } from '../../question/model/question-duo';
import { QuestionOptionsComponent } from '../../question/components/question-options/question-options.component';
import { QuestionCodeBlockComponent } from '../../question/components/question-code-block/question-code-block.component';



@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  url: string;
  currentLevel: Level;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl;
  }

  getSectionsList() {
    return this.http.get<Section[]>(`${this.url}/sections?username=${this.getCurrentUser()}`);
  }

  getSection(cod: string) {
    return this.http.get<Section>(`${this.url}/section/${cod}?username=${this.getCurrentUser()}`);
  }

  responseLevel(resultLevel) {
    resultLevel.username = this.getCurrentUser();
    return this.http.post<any>(`${this.url}/responseLevel`, resultLevel);
  }

  getLevel(codSectionLevel) {
    return this.http.get<Level>(`${this.url}/level/${codSectionLevel}?username=${this.getCurrentUser()}`);
  }

  getQuestionsDuo(questions) {
    
    const qDuos: QuestionDuo[] = [];

    questions.sort( (q1, q2) => q1.orden - q2.orden).forEach( (question, index) => {
      question.isLast = index === questions.length - 1;
      let qDuo: QuestionDuo;
      if (question.type === 'option') {
        qDuo = new QuestionDuo(QuestionOptionsComponent, question);
      } else if (question.type === 'codeBlock') {
        qDuo = new QuestionDuo(QuestionCodeBlockComponent, question);
      }
      qDuos.push(qDuo);
    });

    return qDuos;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }

  setCurrentLevel(level: Level) {
    this.currentLevel = level;
  }

  getCurrentLevel() {
    return this.currentLevel;
  }
}
