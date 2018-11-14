import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { QuestionDirective } from './directives/question.directive';
import { SectionsService } from '../../services/sections.service';
import { QuestionDuo } from '../../../question/model/question-duo';
import { Router } from '../../../../../node_modules/@angular/router';
import { InfoUser } from '../../../shared/model/info-user.model';

declare var jQuery: any;

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements AfterViewInit, OnInit {
  @ViewChild('myModal') myModal;
  @ViewChild(QuestionDirective) dQuestion: QuestionDirective;
  index = 0;
  qDuos: QuestionDuo[];
  alertType: string = null;

  questions: number;
  correctQuestion = 0;
  incorrectQuestion = 0;
  progressCorrect = '0%';
  progressIncorrect = '0%';

  newInfo: InfoUser = new InfoUser(undefined);

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private sectionService: SectionsService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadLevel();
  }

  ngAfterViewInit() {
    this.loadQuestion();
    this.cdr.detectChanges();
  }

  loadLevel() {
    this.qDuos = this.sectionService.getQuestionsDuo();
    this.questions = this.qDuos.length;
  }

  loadQuestion() {
    const qDuo = this.qDuos[this.index];

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
    if (isCorrect) {
      this.correctQuestion++;
      this.alertType = 'correct';
      const percentajeCorrect = (this.correctQuestion / this.questions) * 100;
      this.progressCorrect = percentajeCorrect.toString() + '%';
    } else {
      this.incorrectQuestion++;
      this.alertType = 'incorrect';

      const percentajeIncorrect = (this.incorrectQuestion / this.questions) * 100;
      this.progressIncorrect = percentajeIncorrect.toString() + '%';
    }
  }

  nextQuestion(isLast: boolean) {
    if (isLast) {
      this.sectionService.responseLevel(this.correctQuestion, this.incorrectQuestion)
        .subscribe((data) => {
          this.newInfo = data;
          jQuery(this.myModal.nativeElement).modal('show');
        }
      );
    } else {
      this.index++;
      this.alertType = null;
      this.loadQuestion();
    }
  }

  backSections() {
    const codSection = this.sectionService.getCurrentLevel().codSection;
    this.router.navigate(['/section', codSection]);
    jQuery(this.myModal.nativeElement).modal('hide');
  }

}
