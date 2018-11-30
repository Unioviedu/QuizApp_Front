import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { QuestionOptionsComponent } from '../../../question/components/question-options/question-options.component';
import { QuestionCodeBlockComponent } from '../../../question/components/question-code-block/question-code-block.component';
import { QuestionCompleteCodeComponent } from '../../../question/components/question-complete-code/question-complete-code.component';
import { QuestionDirective } from '../../directives/question.directive';

declare var jQuery: any;

@Component({
  selector: 'app-custom-questions',
  templateUrl: './custom-questions.component.html',
  styleUrls: ['./custom-questions.component.css']
})
export class CustomQuestionsComponent implements OnInit {
  @ViewChild(QuestionDirective) dQuestion: QuestionDirective;
  @ViewChild('questionModal') qModal;

  questions = [];
  currentQuestion: any = {};

  constructor(private userService: UserService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadQuestions();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadQuestions() {
    this.userService.getQuestionByUser().subscribe(
      questions => {
        this.questions = questions;
      }
    );
  }

  showQuestion(id) {
    this.currentQuestion = this.questions.find(q => q.id == id);

    this.loadQuestion();
    jQuery(this.qModal.nativeElement).modal('show');
  }

  loadQuestion() {
    let question = this.currentQuestion.question;
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
