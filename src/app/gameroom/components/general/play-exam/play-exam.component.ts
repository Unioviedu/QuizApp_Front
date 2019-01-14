import { Component, OnInit, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { QuestionDuo } from '../../../../question/model/question-duo';
import { ActivatedRoute } from '@angular/router';
import { GameRoomService } from '../../../services/GameRoomService';
import { QuestionService } from '../../../../question/services/question.service';
import { QuestionDirective } from '../../../directives/question.directive';

declare var jQuery: any;


@Component({
  selector: 'app-play-exam',
  templateUrl: './play-exam.component.html',
  styleUrls: ['./play-exam.component.css']
})
export class PlayExamComponent implements OnInit {
  @ViewChild('myModal') myModal;
  @ViewChild(QuestionDirective) dQuestion: QuestionDirective;
  index = 0;
  idExam: string;
  exam: any = {};
  calification: any = {};

  qDuos: QuestionDuo[];

  constructor(private activatedRoute: ActivatedRoute,
    private gameRoomService: GameRoomService,
    private questionService: QuestionService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef) {
    this.activatedRoute.params.subscribe(params => {
      this.idExam = params['id'];
    });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.loadExam();
    this.cdr.detectChanges();
  }

  loadExam() {
    let me = this;
    this.gameRoomService.findExamById(this.idExam).subscribe(
      exam => {
        me.exam = exam;
        this.qDuos = this.questionService.getQuestionsDuo(exam.exercises);
        this.loadQuestion();
      }
    );
  }

  loadQuestion() {
    const qDuo = this.qDuos[this.index];
    qDuo.data["nQuestions"] = this.qDuos.length;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(qDuo.component);
    const viewContainerRef = this.dQuestion.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = <any>componentRef.instance;
    
    componentInstance.data = qDuo.data;
    componentInstance.isExam = true;

    componentInstance.nextQuestionEvent.subscribe(($event) => this.nextQuestion($event));
    componentInstance.backQuestionEvent.subscribe(($event) => this.backQuestion($event));
  }

  finishExam() {
    let result = {
      idExam: this.idExam,
      numCorrectExercises: 0,
      numIncorrectExercises: 0
    };

    this.qDuos.forEach(q => q.data.response ? 
        q.data.response.isCorrect ? result.numCorrectExercises++ : result.numIncorrectExercises++
        : result.numIncorrectExercises++);

    this.gameRoomService.addResultExam(result).subscribe(
      data => {
        this.calification = data;
        jQuery(this.myModal.nativeElement).modal('show');
      }
    );
  }

  nextQuestion(data: any) {
    this.qDuos[data.orden-1].data = data;
    this.index++;
    this.loadQuestion();
  }

  backQuestion(data: any) {
    this.qDuos[data.orden-1].data = data;
    this.index--;
    this.loadQuestion();
  }

  closeModal() {
    jQuery(this.myModal.nativeElement).modal('hide');
  }

}
