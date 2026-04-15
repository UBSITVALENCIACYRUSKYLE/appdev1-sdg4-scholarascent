import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LessonsComponent } from './pages/lessons/lessons';
import { LessonDetailComponent } from './pages/lesson-detail/lesson-detail';
import { HunterProfileComponent } from './pages/hunter-profile/hunter-profile';
import { LoginComponent } from './pages/login/login';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'lesson/:id', component: LessonDetailComponent },
  { path: 'profile', component: HunterProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];