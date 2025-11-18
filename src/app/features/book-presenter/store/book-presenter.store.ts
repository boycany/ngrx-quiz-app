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
  addEntity,
  entityConfig,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Book } from '../../../models/book.model';

const bookConfig = entityConfig({
  entity: type<Book>(),
  // collection: '_books',// add underline to make the entity private
  collection: 'books',
  selectId: (book) => book.id,
});

export const BookPresenterStore = signalStore(
  withState(initialBookPresenterState),
  withEntities(bookConfig),
  withComputed((store) => ({
    // book: computed(() => BOOKS_COLLECTION[store.id()]),
    book: computed(() => {
      const b = store.booksEntityMap()[store.id()];
      console.log('b :>> ', b);
      return b;
    }),
  })),
  withMethods((store) => ({
    setBookId: signalMethod((id: number) => {
      console.log('id :>> ', id);
      patchState(store, { id });
    }),
    renameCurrentBook: (title: string) => {
      patchState(
        store,
        updateEntity(
          {
            id: store.id(),
            changes: {
              title,
            },
          },
          bookConfig,
        ),
      );
    },
    // createNewBook: (title: string, author: string) => {
    //   const newId =
    //     Math.max(...Object.keys(store.booksEntityMap()).map((id) => +id)) + 1;
    //   patchState(
    //     store,
    //     addEntity(
    //       {
    //         id: newId,
    //         title,
    //         author,
    //         description: '',
    //       },
    //       bookConfig,
    //     ),
    //   );
    // },
  })),
  withDevtools('book-presenter'),
  withHooks((store) => ({
    onInit: () => {
      patchState(store, setAllEntities(BOOKS_COLLECTION, bookConfig));
    },
  })),
);
