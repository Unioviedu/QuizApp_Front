import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { QuestionDirective } from './directives/question.directive';
import { SectionsService } from '../../services/sections.service';
import { QuestionDuo } from '../../../question/model/question-duo';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { InfoUser } from '../../../shared/model/info-user.model';
import { Level } from '../../model/level.model';
import { QuestionService } from '../../../question/services/question.service';

declare var jQuery: any;

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements AfterViewInit, OnInit {
  @ViewChild('myModal') myModal;
  @ViewChild(QuestionDirective) dQuestion: QuestionDirective;
  codSectionLevel: string;
  level: Level;

  index = 0;
  qDuos: QuestionDuo[];
  alertType: string = null;

  questions: number;
  correctQuestion = null;
  incorrectQuestion = null;
  progressCorrect = '0%';
  progressIncorrect = '0%';

  newInfo: InfoUser = new InfoUser(undefined);

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private sectionService: SectionsService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params.subscribe(params => {
        this.codSectionLevel = params['cod'];
      });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadLevel();
    this.cdr.detectChanges();
  }

  loadLevel() {
    this.sectionService.getLevel(this.codSectionLevel).subscribe(
      level => {
        this.level = level;
        this.qDuos = this.questionService.getQuestionsDuo(level.questions);
        this.loadQuestion();
        this.questions = this.qDuos.length;
      }
    );
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
      if (!this.correctQuestion) {
        this.correctQuestion = 0;
      }
      
      this.correctQuestion++;
      this.alertType = 'correct';
      const percentajeCorrect = (this.correctQuestion / this.questions) * 100;
      this.progressCorrect = percentajeCorrect.toString() + '%';
    } else {
      if (!this.incorrectQuestion) {
        this.incorrectQuestion = 0;
      }

      this.incorrectQuestion++;
      this.alertType = 'incorrect';

      const percentajeIncorrect = (this.incorrectQuestion / this.questions) * 100;
      this.progressIncorrect = percentajeIncorrect.toString() + '%';
    }
  
    const me = this;

    setTimeout(function() { 
      me.alertType = null; 
    }, 1500);
  }

  nextQuestion(data: any) {
    if (data.isLast) {
      const resultLevel = {
        'idLevel': this.level.id,
        'idSection': this.level.idSection,
        'numCorrectQuestion': this.correctQuestion,
        'numIncorrectQuestion': this.incorrectQuestion,
        'nextLevels': this.level.nextLevels,
        'expBase': this.level.experience
      };

      this.sectionService.responseLevel(resultLevel)
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
    const codSection = this.codSectionLevel.split("_")[0];
    this.router.navigate(['/section', codSection]);
    jQuery(this.myModal.nativeElement).modal('hide');
  }

}
