import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './profile.routing'

import { ProfileComponent } from './components/profile/profile.component';
import { RankLevelComponent } from './components/rank-level/rank-level.component';
import { SharedModule } from '../shared/shared.module';
import { CustomQuestionsComponent } from './components/custom-questions/custom-questions.component';
import { QuestionDirective } from './directives/question.directive';

@NgModule({
  imports: [
    routing,
    CommonModule,
    SharedModule
  ],
  declarations: [ProfileComponent, RankLevelComponent, CustomQuestionsComponent, QuestionDirective]
})
export class ProfileModule { }
