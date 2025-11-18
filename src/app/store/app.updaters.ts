import { PartialStateUpdater } from '@ngrx/signals';
import { AppState } from './app.state';
import { Dictionary } from '../data/dictionaries';

export function changeLanguage(
  languages: string[],
): PartialStateUpdater<AppState> {
  return (state) => {
    const currentIndex = languages.indexOf(state.selectedLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const selectedLanguage = languages[nextIndex];
    return { selectedLanguage };
  };
}

export function resetLanguage(
  languages: string[],
): PartialStateUpdater<AppState> {
  return (_) => ({
    possibleLanguages: languages,
    selectedLanguage: languages[0],
  });
}

export function setDictionary(
  dictionary: Dictionary,
): PartialStateUpdater<AppState> {
  return (_) => ({
    selectedDictionary: dictionary,
  });
}
