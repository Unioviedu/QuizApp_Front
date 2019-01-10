import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './components/common/rooms/rooms.component';
import { routing } from '../gameroom/gameroom.routing';
import { AddRoomComponent } from './components/admin/add-room/add-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GameRoomService } from './services/GameRoomService';
import { RoomCardComponent } from './components/common/room-card/room-card.component';
import { ViewRoomAdminComponent } from './components/admin/view-room-admin/view-room-admin.component';
import { AddExamComponent } from './components/admin/add-exam/add-exam.component';
import { AddQuestionExamComponent } from './components/admin/add-question-exam/add-question-exam.component';
import { QuestionModule } from '../question/question.module';
import { QuestionDirective } from './directives/question.directive';
import { TableQuestionExamComponent } from './components/admin/add-exam/table-question-exam/table-question-exam.component';

import {CalendarModule} from 'primeng/calendar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    QuestionModule,
    CalendarModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    RoomsComponent,
    AddRoomComponent,
    RoomCardComponent,
    ViewRoomAdminComponent,
    AddExamComponent,
    AddQuestionExamComponent,
    QuestionDirective,
    TableQuestionExamComponent
  ],
  providers: [
    GameRoomService
  ]
})
export class GameroomModule { }
