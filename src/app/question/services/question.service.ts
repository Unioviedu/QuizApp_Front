import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionDuo } from '../../question/model/question-duo';
import { QuestionOptionsComponent } from '../../question/components/question-options/question-options.component';
import { QuestionCodeBlockComponent } from '../../question/components/question-code-block/question-code-block.component';
import { QuestionCompleteCodeComponent } from '../components/question-complete-code/question-complete-code.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl;
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
      } else if (question.type == 'completeCode') {
        qDuo = new QuestionDuo(QuestionCompleteCodeComponent, question);
      }
      qDuos.push(qDuo);
    });

    return qDuos;
  }

  getQuestionDuo(question: any) {
    let qDuo;
        if (question.type === 'option') {
          qDuo = new QuestionDuo(QuestionOptionsComponent, question);
        } else if (question.type === 'codeBlock') {
          qDuo = new QuestionDuo(QuestionCodeBlockComponent, question);
        } else if (question.type == 'completeCode') {
            qDuo = new QuestionDuo(QuestionCompleteCodeComponent, question);
        }

        return qDuo;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }


}
