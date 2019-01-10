import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionOptionsComponent } from './components/question-options/question-options.component';
import { QuestionCodeBlockComponent } from './components/question-code-block/question-code-block.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { QuestionCompleteCodeComponent } from './components/question-complete-code/question-complete-code.component';
import { GenericQuestionComponent } from './components/create-question/generic-question/generic-question.component';
import { CreateQuestionOptionComponent } from './components/create-question/question-types/create-question-option/create-question-option.component';
import { CreateQuestionCodeBlockComponent } from './components/create-question/question-types/create-question-code-block/create-question-code-block.component';
import { CreateQuestionCompleteCodeComponent } from './components/create-question/question-types/create-question-complete-code/create-question-complete-code.component';



@NgModule({
  imports: [
    CommonModule,
    HighlightJsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    GenericQuestionComponent,
    QuestionOptionsComponent, 
    QuestionCodeBlockComponent, 
    QuestionCompleteCodeComponent,
    CreateQuestionOptionComponent,
    CreateQuestionCodeBlockComponent,
    CreateQuestionCompleteCodeComponent],
  entryComponents: [
    QuestionOptionsComponent, 
    QuestionCodeBlockComponent, 
    QuestionCompleteCodeComponent,
    CreateQuestionOptionComponent,
    CreateQuestionCodeBlockComponent,
    CreateQuestionCompleteCodeComponent],
  exports: [
    QuestionOptionsComponent, 
    QuestionCodeBlockComponent,
    QuestionCompleteCodeComponent,
    CreateQuestionOptionComponent,
    CreateQuestionCodeBlockComponent,
    CreateQuestionCompleteCodeComponent]
})
export class QuestionModule { }
