import { PartialStateUpdater } from '@ngrx/signals';
import { AppState } from './app.state';

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
