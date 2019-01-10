import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../login/services/auth.guard';
import { RoomsComponent } from './components/common/rooms/rooms.component';
import { ViewRoomAdminComponent } from './components/admin/view-room-admin/view-room-admin.component';
import { AddExamComponent } from './components/admin/add-exam/add-exam.component';
import { AddQuestionExamComponent } from './components/admin/add-question-exam/add-question-exam.component';

const appRoutes: Routes = [
    { path: 'gameRoom', component: RoomsComponent, canActivate: [AuthGuard]  },
    { path: 'room/:id', component: ViewRoomAdminComponent, canActivate: [AuthGuard]  },
    { path: 'addExam', component: AddExamComponent, canActivate: [AuthGuard]  },
    { path: 'addQuestion', component: AddQuestionExamComponent, canActivate: [AuthGuard]  }
];

export const routing = RouterModule.forChild(appRoutes);