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
import { ColorQuizGenerator } from '../services/color-quiz-generator';
import { NotificationsService } from '../services/notifications-service';
import { tapResponse } from '@ngrx/operators';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppState),
  withProps((_) => {
    const _dictionariesService = inject(Dictionaries);
    const _languages = _dictionariesService.languages;
    // console.log('_languages :>> ', _languages);
    return {
      _languages,
      _dictionariesService,
      _quizGeneratorService: inject(ColorQuizGenerator),
      _notifications: inject(NotificationsService),
    };
  }),
  withMethods((store) => {
    // Simulate fetching Dictionary from api
    // GET /dictionary?lang=xx at initial load or when language changes
    // the type string means the input type of the method
    const _invalidateDictionary = rxMethod<string>((input$) =>
      input$.pipe(
        tap((_) => patchState(store, setBusy(true))),
        switchMap((lang) => {
          return store._dictionariesService.getDictionaryWithDelay(lang).pipe(
            // use tapResponse to handle next and error cases in the inner observable and the outer observable stream won't be affected
            // Each one of the inner observables return single value and then complete, that means we can setBusy in finalize instead of next and error separately
            tapResponse({
              next: (dict) => {
                store._notifications.success(
                  `Loaded dictionary for language: ${lang}`,
                );
                patchState(store, setDictionary(dict));
              },
              error: (error) => store._notifications.error(`${error}`),
              finalize: () => patchState(store, setBusy(false)),
            }),
          );
        }),
      ),
    );

    /** Run everytime the selected language changed */
    /** Explain:
     * _invalidateDictionary 是一個用 rxMethod 包裹起來的函數。
     * 在 store 初始化的時候，我們將 selectedLanguage 的 signal 丟入，
     * （just pass the value in signal type directly, no need to unwrap it）
     * rxMethod 會訂閱這個 signal 的變化，當 signal 改變時，就會觸發後續的更新！
     * 於是就也不用在 changeLanguage 和 resetLanguage 內重複調用 _invalidateDictionary 了！
     */
    _invalidateDictionary(store.selectedLanguage);

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
        // _invalidateDictionary(store.selectedLanguage());
      },
      /* add underline to indicate this method is private */
      _resetLanguage: () => {
        patchState(store, resetLanguage(store._languages));
        // _invalidateDictionary(store.selectedLanguage());
      },
      // _invalidateDictionary,
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguage();
    },
  })),
);
