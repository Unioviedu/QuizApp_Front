import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
  @ViewChild(QuestionDirective) dQuestion: QuestionDirective;
  @ViewChild('questionModal') qModal;

  questions = [];

  constructor(private router: Router, private addExamService: AddExamService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef) {
      this.questions = addExamService.questions;
    }

  ngOnInit() {
  }

  addQuestion() {
    this.router.navigate( ['/addQuestion'] );
  }

  removeQuestion(index:number) {
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
