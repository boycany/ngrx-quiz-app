import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialBookPresenterState } from './book-presenter.state';
import { computed } from '@angular/core';
import { BOOKS_COLLECTION } from '../../../data/books-collection';

export const BookPresenterStore = signalStore(
  withState(initialBookPresenterState),
  withComputed((store) => ({
    book: computed(() => BOOKS_COLLECTION[store.id()]),
  })),
  withMethods((store) => ({
    setBookId: signalMethod((id: number) => {
      console.log('id :>> ', id);
      patchState(store, { id });
    }),
  })),
);
