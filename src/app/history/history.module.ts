import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { routing } from './history.routing';

import { SectionsComponent } from './components/sections/sections.component';
import { SharedModule } from '../shared/shared.module';
import { SectionComponent } from './components/section/section.component';
import { LevelComponent } from './components/level/level.component';
import { QuestionModule } from '../question/question.module';
import { QuestionDirective } from './components/level/directives/question.directive';
import { LevelGuard } from './services/level.guard';
import { SectionsService } from './services/sections.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    QuestionModule
  ],
  declarations: [
    SectionsComponent,
    SectionComponent,
    LevelComponent,
    QuestionDirective
  ], providers: [
    LevelGuard,
    SectionsService
  ]
})
export class HistoryModule { }
