import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { QuestionDirective } from './directives/question.directive';
import { CompetitiveService } from '../../services/competitive.services';
import { InfoUser } from 'src/app/shared/model/info-user.model';

declare var jQuery: any;

@Component({
  selector: 'app-play-question',
  templateUrl: './play-question.component.html',
  styleUrls: ['./play-question.component.css']
})
export class PlayQuestionComponent implements AfterViewInit, OnInit {
  @ViewChild(QuestionDirective) dQuestion: QuestionDirective;
  @ViewChild('modalVote') modalVote;
  @ViewChild('modalResponse') modalResponse;

  cont = 0;
  currentQuestion: any;

  isForVote: boolean;
  alertType = '';
  exitButton: boolean;

  newInfo: InfoUser = new InfoUser(undefined);

  constructor(private service: CompetitiveService,
    private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getQuestion();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getQuestion() {
    this.service.getNextQuestion(this.cont).subscribe(
      question => {
        this.currentQuestion = question;
        this.isForVote = this.currentQuestion.state === 'CREATED';
        this.loadQuestion();
      }
    );
  }

  loadQuestion() {
    const qDuo = this.service.getDuoQuestion(this.currentQuestion.question);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(qDuo.component);
    const viewContainerRef = this.dQuestion.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = <any>componentRef.instance;

    componentInstance.data = qDuo.data;
    componentInstance.responseQuestionEvent.subscribe(($event) => this.responseQuestion($event));
    componentInstance.nextQuestionEvent.subscribe(($event) => this.nextQuestion($event));
  }

  responseQuestion(isCorrect: boolean) {
    this.exitButton = true;
    
    if (this.currentQuestion.state !== 'ACCEPT') {
      this.lauchAlertSimple(isCorrect);
      return;
    }

    this.service.responseQuestion(this.currentQuestion.id, isCorrect).subscribe(
      response => {
        this.newInfo = new InfoUser(response);
        jQuery(this.modalResponse.nativeElement).modal('show');
      }
    );
  }

  lauchAlertSimple(isCorrect: boolean) {
    if (isCorrect) {
      this.alertType = 'correct';
    } else {
      this.alertType = 'incorrect';
    }
  }

  nextQuestion(isLast: boolean) {
    if (this.isForVote) {
      jQuery(this.modalVote.nativeElement).modal('show');
    } else {
      this.loadNextQuestion();
    }
  }

  voteQuestion(vote: boolean) {
    const voteObj = {
      'idQuestion': this.currentQuestion.id,
      'vote': vote
    };
    this.service.voteQuestion(voteObj).subscribe();

    this.loadNextQuestion();
  }

  loadNextQuestion() {
    this.cont++;
    this.getQuestion();
    this.loadQuestion();
    this.alertType = null;
    this.exitButton = false;
    this.newInfo = new InfoUser(undefined);
  }

}
