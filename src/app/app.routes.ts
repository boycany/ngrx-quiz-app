import { Routes } from '@angular/router';
import { QuizStore } from './features/quiz/store/quiz.store';
import { BookPresenterStore } from './features/book-presenter/store/book-presenter.store';

export const routes: Routes = [
  // redirect to 'quiz' temporarily
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
  {
    path: 'books',
    redirectTo: 'books/1',
    pathMatch: 'full',
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./features/book-presenter/book-presenter').then(
        (m) => m.BookPresenter,
      ),
    providers: [BookPresenterStore],
  },
];
