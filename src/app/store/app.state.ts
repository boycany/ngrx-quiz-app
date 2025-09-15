export interface AppState {
  readonly selectedLanguage: string;
  readonly possibleLanguages: string[];
}

// We want to inject the initial state so we initialize the values as empty
export const initialAppState: AppState = {
  selectedLanguage: '',
  possibleLanguages: [],
};
