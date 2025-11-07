import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialAppState } from './app.state';
import { inject } from '@angular/core';
import {
  changeLanguage,
  resetLanguage,
  setBusy,
  setDictionary,
} from './app.updaters';
import { Dictionaries } from '../services/dictionaries';
import { switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppState),
  withProps((_) => {
    const _dictionariesService = inject(Dictionaries);
    const _languages = _dictionariesService.languages;
    console.log('_languages :>> ', _languages);
    return { _languages, _dictionariesService };
  }),
  withMethods((store) => {
    // Simulate fetching Dictionary from api
    // GET /dictionary?lang=xx at initial load or when language changes
    const _invalidateDictionary = rxMethod<string>((input$) =>
      input$.pipe(
        tap((lang) => {
          console.log('invalidate dictionary for language:', lang);
          patchState(store, setBusy(true));
        }),
        switchMap((lang) => {
          return store._dictionariesService.getDictionaryWithDelay(lang);
        }),
        tap((dictionary) => {
          console.log('result when completed dictionary fetch:', dictionary);
          patchState(store, setBusy(false), setDictionary(dictionary));
        }),
      ),
    );

    return {
      changeLanguage: () => {
        // Prevent changing language when we are already busy
        if (store.isBusy()) {
          console.warn(
            'Change language request ignored because store is busy.',
          );
          return;
        }
        patchState(store, changeLanguage(store._languages));
        _invalidateDictionary(store.selectedLanguage());
      },
      _resetLanguage: () => {
        patchState(store, resetLanguage(store._languages));
        _invalidateDictionary(store.selectedLanguage());
      },
      _invalidateDictionary,
      // add underline to indicate this method is private
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguage();
    },
  })),
);
