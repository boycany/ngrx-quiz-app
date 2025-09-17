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
import { DICTIONARIES_TOKEN } from '../tokens/dictionaries.token';
import { changeLanguage, resetLanguage } from './app.updaters';
import { getDictionary } from './app.helpers';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppState),
  withProps((_) => {
    const _dictionaries = inject(DICTIONARIES_TOKEN);
    const _languages = Object.keys(_dictionaries);
    return { _languages, _dictionaries };
  }),
  withComputed((store) => ({
    selectedDictionary: computed(() =>
      getDictionary(store.selectedLanguage(), store._dictionaries),
    ),
  })),
  withMethods((store) => ({
    changeLanguage: () => patchState(store, changeLanguage(store._languages)),
    _resetLanguage: () => patchState(store, resetLanguage(store._languages)),
    // add underline to indicate this method is private
  })),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguage();
    },
  })),
);
