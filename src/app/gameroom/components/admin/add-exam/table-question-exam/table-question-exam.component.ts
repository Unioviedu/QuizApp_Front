import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddExamService } from '../../../../services/AddExamService';
import { QuestionCodeBlockComponent } from '../../../../../question/components/question-code-block/question-code-block.component';
import { QuestionOptionsComponent } from '../../../../../question/components/question-options/question-options.component';
import { QuestionCompleteCodeComponent } from '../../../../../question/components/question-complete-code/question-complete-code.component';
import { QuestionDirective } from '../../../../directives/question.directive';

declare var jQuery: any;

@Component({
  selector: 'app-table-question-exam',
  templateUrl: './table-question-exam.component.html',
  styleUrls: ['./table-question-exam.component.css']
})
export class TableQuestionExamComponent implements OnInit {
  @Output() addQuestionEvent: EventEmitter<boolean>;
  @ViewChild(QuestionDirective) dQuestion: QuestionDirective;
  @ViewChild('questionModal') qModal;

  idRoom: any;
  questions = [];

  constructor(private router: Router, private addExamService: AddExamService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.idRoom = params['id'];
    });
    this.questions = addExamService.questions;

    this.addQuestionEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  addQuestion() {
    this.addQuestionEvent.emit();
    this.router.navigate(['/addQuestion', this.idRoom]);
  }

  removeQuestion(index: number) {
    this.addExamService.removeQuestion(index);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  showQuestion(index) {
    var currentQuestion = this.addExamService.questions[index];

    this.loadQuestion(currentQuestion);
    jQuery(this.qModal.nativeElement).modal('show');
  }

  loadQuestion(currentQuestion) {
    let question = currentQuestion;
    let component;

    if (question.type === 'option') {
      component = QuestionOptionsComponent;
    } else if (question.type === 'codeBlock') {
      component = QuestionCodeBlockComponent;
    } else if (question.type == 'completeCode') {
      component = QuestionCompleteCodeComponent;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.dQuestion.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = <any>componentRef.instance;

    componentInstance.data = question;
    componentInstance.responseQuestionEvent.subscribe(($event) => this.responseQuestion($event));
    componentInstance.nextQuestionEvent.subscribe(($event) => this.nextQuestion($event));
  }

  responseQuestion(event) {

  }

  nextQuestion(event) {

  }

}
