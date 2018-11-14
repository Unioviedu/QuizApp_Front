import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionOptionsComponent } from './components/question-options/question-options.component';
import { QuestionCodeBlockComponent } from './components/question-code-block/question-code-block.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HighlightJsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [QuestionOptionsComponent, QuestionCodeBlockComponent],
  entryComponents: [QuestionOptionsComponent, QuestionCodeBlockComponent],
  exports: [QuestionOptionsComponent, QuestionCodeBlockComponent]
})
export class QuestionModule { }
