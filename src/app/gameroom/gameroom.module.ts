import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './components/common/rooms/rooms.component';
import { routing } from '../gameroom/gameroom.routing';
import { AddRoomComponent } from './components/admin/add-room/add-room.component';
import { ReactiveFormsModule } from '@angular/forms';

import { GameRoomService } from './services/GameRoomService';
import { RoomCardComponent } from './components/common/room-card/room-card.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule
  ],
  declarations: [
    RoomsComponent,
    AddRoomComponent,
    RoomCardComponent
  ],
  providers: [
    GameRoomService
  ]
})
export class GameroomModule { }
