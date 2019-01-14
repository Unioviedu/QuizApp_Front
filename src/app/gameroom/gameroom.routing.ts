import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../login/services/auth.guard';
import { RoomsComponent } from './components/common/rooms/rooms.component';
import { AddExamComponent } from './components/admin/add-exam/add-exam.component';
import { AddQuestionExamComponent } from './components/admin/add-question-exam/add-question-exam.component';
import { ViewRoomComponent } from './components/common/view-room/view-room.component';
import { PlayExamComponent } from './components/general/play-exam/play-exam.component';

const appRoutes: Routes = [
    { path: 'gameRoom', component: RoomsComponent, canActivate: [AuthGuard]  },
    { path: 'room/:id', component: ViewRoomComponent, canActivate: [AuthGuard]  },
    { path: 'addExam/:id', component: AddExamComponent, canActivate: [AuthGuard]  },
    { path: 'addQuestion/:id', component: AddQuestionExamComponent, canActivate: [AuthGuard]  },
    { path: 'exam/:id', component: PlayExamComponent, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forChild(appRoutes);