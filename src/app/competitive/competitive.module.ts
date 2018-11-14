import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitiveHomeComponent } from './components/competitive-home/competitive-home.component';

import { routing } from './competitive.routing';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { CreateQuestionOptionComponent } from './components/create-question/question-types/create-question-option/create-question-option.component';
import { CreateQuestionCodeBlockComponent } from './components/create-question/question-types/create-question-code-block/create-question-code-block.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PlayQuestionComponent } from './components/play-question/play-question.component';

import { QuestionDirective } from './components/play-question/directives/question.directive';
import { QuestionModule } from '../question/question.module';
import { GenericQuestionComponent } from './components/create-question/generic-question/generic-question.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    QuestionModule
  ],
  declarations: [
    CompetitiveHomeComponent,
    CreateQuestionComponent,
    CreateQuestionOptionComponent,
    CreateQuestionCodeBlockComponent,
    PlayQuestionComponent,
    QuestionDirective,
    GenericQuestionComponent
  ]
})
export class CompetitiveModule { }
