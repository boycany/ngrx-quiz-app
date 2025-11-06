import { Dictionary } from '../data/dictionaries';

export interface AppState {
  readonly selectedLanguage: string;
  readonly possibleLanguages: string[];
  readonly selectedDictionary: Dictionary | null;
  readonly isBusy: boolean;

  // _x: number; // just to demonstrate that we can have private state too
}

// We want to inject the initial state so we initialize the values as empty
export const initialAppState: AppState = {
  selectedLanguage: '',
  possibleLanguages: [],
  selectedDictionary: null,
  isBusy: false,
  // _x: 0, // just to demonstrate that we can have private state too
};
