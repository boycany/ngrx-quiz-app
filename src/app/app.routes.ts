import { Routes } from '@angular/router';

export const routes: Routes = [
  // redirect to 'quiz' temporarily
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/quiz').then((m) => m.Quiz),
  },
];
