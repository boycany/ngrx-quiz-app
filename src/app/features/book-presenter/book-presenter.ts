import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { BookPresenterStore } from './store/book-presenter.store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BOOKS_COLLECTION } from '../../data/books-collection';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-book-presenter',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './book-presenter.html',
  styleUrl: './book-presenter.scss',
})
export class BookPresenter {
  readonly id = input.required({ transform: numberAttribute });
  store = inject(BookPresenterStore);

  readonly router = inject(Router);

  next() {
    this.router.navigate([
      'books',
      Math.min(this.id() + 1, this.store.booksEntities().length - 1),
    ]);
  }

  previous() {
    this.router.navigate(['books', Math.max(this.id() - 1, 0)]);
  }

  constructor() {
    /** Old Solution */
    // effect(() => {
    //   this.store.setBookId(this.id());
    // });

    /** Solution with signalMethod */
    this.store.setBookId(this.id);
  }

  navigateToQuizPage() {
    this.router.navigate(['../quiz']);
  }
}
