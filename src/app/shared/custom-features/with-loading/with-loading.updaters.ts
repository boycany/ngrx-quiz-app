import { PartialStateUpdater } from '@ngrx/signals';
import { LoadingState } from './with-loading.state';

export function setLoading(): PartialStateUpdater<LoadingState> {
  return (_) => ({ isLoading: true });
}

export function setIdle(): PartialStateUpdater<LoadingState> {
  return (_) => ({ isLoading: false });
}

export function toggleLoading(): PartialStateUpdater<LoadingState> {
  return (state) => ({ isLoading: !state.isLoading });
}
