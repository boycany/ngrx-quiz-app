import {
  EmptyFeatureResult,
  signalStoreFeature,
  SignalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';
import { initialLoadingState, LoadingState } from './with-loading.state';
import { Signal } from '@angular/core';

/** Should write the type of response! */
export function withLoading(): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: LoadingState;
    props: {
      isIdle: Signal<boolean>;
    };
    methods: {};
  }
> {
  return signalStoreFeature(
    withState(initialLoadingState),
    withComputed((store) => ({
      isIdle: () => !store.isLoading(),
    })),
  );
}
