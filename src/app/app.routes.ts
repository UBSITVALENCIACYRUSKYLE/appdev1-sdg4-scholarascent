import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LessonsComponent } from './pages/lessons/lessons';
import { LessonDetailComponent } from './pages/lesson-detail/lesson-detail';
import { HunterProfileComponent } from './pages/hunter-profile/hunter-profile';
import { LoginComponent } from './pages/login/login';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authActivateGuard } from './guards/auth-guard';
import { lessonDeactivateGuard } from './guards/lesson-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authActivateGuard]
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    canActivate: [authActivateGuard]
  },
  {
    path: 'lesson/:id',
    component: LessonDetailComponent,
    canActivate: [authActivateGuard]
  },
  {
    path: 'profile',
    component: HunterProfileComponent,
    canActivate: [authActivateGuard]
  },
  {
    path: 'lesson/:id',
    component: LessonDetailComponent,
    canActivate: [authActivateGuard],
    canDeactivate: [lessonDeactivateGuard]
  },
  { path: '**', component: NotFoundComponent },
];