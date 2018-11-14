import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionDuo } from '../../question/model/question-duo';
import { QuestionOptionsComponent } from '../../question/components/question-options/question-options.component';
import { QuestionCodeBlockComponent } from '../../question/components/question-code-block/question-code-block.component';

@Injectable({
  providedIn: 'root'
})
export class CompetitiveService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl;
  }

  createNewQuestion(newQuestion: any) {
    const customQuestion: any = {
        'username': this.getCurrentUser(),
        'question': newQuestion
    };

    return this.http.post<any>(`${this.url}/newQuestion`, customQuestion);
  }

  voteQuestion(vote: any) {
    return this.http.post<any>(`${this.url}/voteQuestion`, vote);
  }

  responseQuestion(idQuestion: string, isCorrect: boolean) {
    const responseQuestion: any = {
      'username': this.getCurrentUser(),
      'idQuestion': idQuestion,
      'correct': isCorrect
    };

    return this.http.post<any>(`${this.url}/responseQuestion`, responseQuestion);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }

  getNextQuestion(cont: number) {
    const username = this.getCurrentUser();
    return this.http.get<any>(`${this.url}/nextQuestion?username=${username}&cont=${cont}`);
  }

  getDuoQuestion(question: any) {
    let qDuo;
        if (question.type === 'option') {
          qDuo = new QuestionDuo(QuestionOptionsComponent, question);
        } else if (question.type === 'codeBlock') {
          qDuo = new QuestionDuo(QuestionCodeBlockComponent, question);
        }

        return qDuo;
  }


}
