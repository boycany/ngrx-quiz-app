import { effect } from '@angular/core';
import {
  getState,
  patchState,
  signalStoreFeature,
  SignalStoreFeature,
  withHooks,
} from '@ngrx/signals';

export function withLocalStorage(key: string): SignalStoreFeature {
  return signalStoreFeature(
    withHooks((store) => ({
      onInit: () => {
        const stateJson = localStorage.getItem(key);
        if (stateJson) {
          const state = JSON.parse(stateJson);
          patchState(store, state);
        }

        // Save to localStorage on state changes
        effect(() => {
          const state = getState(store);
          console.log('state :>> ', state);

          const stateJson = JSON.stringify(state);
          localStorage.setItem(key, stateJson);
        });
      },
    })),
  );
}
