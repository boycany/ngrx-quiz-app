import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialAppState } from './app.state';
import { inject } from '@angular/core';
import { DICTIONARIES_TOKEN } from '../tokens/dictionaries.token';
import { changeLanguage } from './app.updaters';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppState),
  withMethods((store) => {
    const dictionaries = inject(DICTIONARIES_TOKEN);
    const languages = Object.keys(dictionaries);
    return {
      changeLanguage: () => patchState(store, changeLanguage(languages)),
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      const dictionaries = inject(DICTIONARIES_TOKEN);
      const languages = Object.keys(dictionaries);
      patchState(store, {
        possibleLanguages: languages,
        selectedLanguage: languages[0],
      });
    },
  })),
);
