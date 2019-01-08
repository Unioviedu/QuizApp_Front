import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../login/services/auth.guard';
import { RoomsComponent } from './components/common/rooms/rooms.component';

const appRoutes: Routes = [
    { path: 'gameRoom', component: RoomsComponent, canActivate: [AuthGuard]  }
];

export const routing = RouterModule.forChild(appRoutes);