import { Routes } from '@angular/router';
import { QuizStore } from './features/quiz/store/quiz.store';

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
    providers: [QuizStore],
    // if we want to keep and maintain the same state of the quiz, we can create it lazily by
    // router provider. It won't destroy when we navigate away from the quiz page.
  },
];
