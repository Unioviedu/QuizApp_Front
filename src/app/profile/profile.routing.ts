import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../login/services/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  }
];
 
export const routing = RouterModule.forChild(appRoutes);