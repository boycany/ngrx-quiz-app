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
import { computed, inject } from '@angular/core';
import {
  changeLanguage,
  resetLanguage,
  setBusy,
  setDictionary,
} from './app.updaters';
import { Dictionaries } from '../services/dictionaries';
import { firstValueFrom } from 'rxjs';

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
    const _invalidateDictionary = async () => {
      patchState(store, setBusy(true));
      const dictionary = await firstValueFrom(
        store._dictionariesService.getDictionaryWithDelay(
          store.selectedLanguage(),
        ),
      );
      console.log('dictionary :>> ', dictionary);
      patchState(store, setBusy(false), setDictionary(dictionary));
    };

    return {
      changeLanguage: async () => {
        // Prevent changing language when we are already busy
        if (store.isBusy()) {
          console.warn(
            'Change language request ignored because store is busy.',
          );
          return;
        }
        patchState(store, changeLanguage(store._languages));
        await _invalidateDictionary();
      },
      _resetLanguage: async () => {
        patchState(store, resetLanguage(store._languages));
        await _invalidateDictionary();
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
