import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './components/common/rooms/rooms.component';
import { routing } from '../gameroom/gameroom.routing';
import { AddRoomComponent } from './components/admin/add-room/add-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GameRoomService } from './services/GameRoomService';
import { RoomCardComponent } from './components/common/room-card/room-card.component';
import { AddExamComponent } from './components/admin/add-exam/add-exam.component';
import { AddQuestionExamComponent } from './components/admin/add-question-exam/add-question-exam.component';
import { QuestionModule } from '../question/question.module';
import { QuestionDirective } from './directives/question.directive';
import { TableQuestionExamComponent } from './components/admin/add-exam/table-question-exam/table-question-exam.component';
import { ViewRoomComponent } from './components/common/view-room/view-room.component';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UsersRoomComponent } from './components/admin/users-room/users-room.component';
import { InviteUsersComponent } from './components/admin/invite-users/invite-users.component';
import { ExamCardComponent } from './components/common/exam-card/exam-card.component';
import { PlayExamComponent } from './components/general/play-exam/play-exam.component';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    QuestionModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyDatePickerModule
  ],
  declarations: [
    RoomsComponent,
    AddRoomComponent,
    RoomCardComponent,
    ViewRoomComponent,
    AddExamComponent,
    AddQuestionExamComponent,
    QuestionDirective,
    TableQuestionExamComponent,
    ExamCardComponent,
    UsersRoomComponent,
    InviteUsersComponent,
    PlayExamComponent
  ],
  providers: [
    GameRoomService
  ]
})
export class GameroomModule { }
