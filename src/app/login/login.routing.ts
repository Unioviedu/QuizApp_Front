import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    { path: 'profile', component: LoginComponent  }
];
 
export const routing = RouterModule.forChild(appRoutes);