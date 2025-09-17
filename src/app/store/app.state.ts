export interface AppState {
  readonly selectedLanguage: string;
  readonly possibleLanguages: string[];
  // _x: number; // just to demonstrate that we can have private state too
}

// We want to inject the initial state so we initialize the values as empty
export const initialAppState: AppState = {
  selectedLanguage: '',
  possibleLanguages: [],
  // _x: 0, // just to demonstrate that we can have private state too
};
