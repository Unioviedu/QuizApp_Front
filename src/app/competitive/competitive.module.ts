import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitiveHomeComponent } from './components/competitive-home/competitive-home.component';

import { routing } from './competitive.routing';
import { CreateQuestionComponent } from './components/create-question/create-question.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PlayQuestionComponent } from './components/play-question/play-question.component';

import { QuestionDirective } from './components/play-question/directives/question.directive';
import { QuestionModule } from '../question/question.module';

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
    PlayQuestionComponent,
    QuestionDirective
  ]
})
export class CompetitiveModule { }
