import {
  patchState,
  signalMethod,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialBookPresenterState } from './book-presenter.state';
import { computed } from '@angular/core';
import { BOOKS_COLLECTION } from '../../../data/books-collection';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  entityConfig,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { Book } from '../../../models/book.model';

const bookConfig = entityConfig({
  entity: type<Book>(),
  collection: '_books', // add underline to make the entity private
  selectId: (book) => book.id,
});

export const BookPresenterStore = signalStore(
  withState(initialBookPresenterState),
  withEntities(bookConfig),
  withComputed((store) => ({
    // book: computed(() => BOOKS_COLLECTION[store.id()]),
    book: computed(() => {
      const b = store._booksEntityMap()[store.id()];
      console.log('b :>> ', b);
      return b;
    }),
  })),
  withMethods((store) => ({
    setBookId: signalMethod((id: number) => {
      console.log('id :>> ', id);
      patchState(store, { id });
    }),
  })),
  withDevtools('book-presenter'),
  withHooks((store) => ({
    onInit: () => {
      patchState(store, setAllEntities(BOOKS_COLLECTION, bookConfig));
    },
  })),
);
