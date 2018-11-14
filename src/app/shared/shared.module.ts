import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { routing } from './shared.routing';

import { SectionCardComponent } from './components/section-card/section-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LevelCardComponent } from './components/level-card/level-card.component';
import { TrophiesComponent } from './components/trophies/trophies.component';
import { FormattedTextComponent } from './components/formatted-text/formatted-text.component';
import { FormsModule } from '@angular/forms';
import { ExceptionService } from './services/exception.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    HighlightJsModule
  ],
  declarations: [
    SectionCardComponent,
    NavbarComponent,
    LevelCardComponent,
    TrophiesComponent,
    FormattedTextComponent
  ],
  exports: [
    SectionCardComponent,
    NavbarComponent,
    LevelCardComponent,
    TrophiesComponent,
    FormattedTextComponent
  ], providers: [
    ExceptionService
  ]
})
export class SharedModule { }
