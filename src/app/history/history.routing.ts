import { Routes, RouterModule } from '@angular/router';
import { SectionsComponent } from './components/sections/sections.component';
import { AuthGuard } from '../login/services/auth.guard';
import { SectionComponent } from './components/section/section.component';
import { LevelComponent } from './components/level/level.component';
import { LevelGuard } from './services/level.guard';

const appRoutes: Routes = [
    { path: 'sections', component: SectionsComponent, canActivate: [AuthGuard]  },
    { path: 'section/:cod', component: SectionComponent, canActivate: [AuthGuard] },
    { path: 'level/:cod', component: LevelComponent, canActivate: [LevelGuard] }
];

export const routing = RouterModule.forChild(appRoutes);
