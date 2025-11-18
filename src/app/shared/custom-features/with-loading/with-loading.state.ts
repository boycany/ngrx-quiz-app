export interface LoadingState {
  readonly isLoading: boolean;
}

export const initialLoadingState: LoadingState = {
  isLoading: false,
};
