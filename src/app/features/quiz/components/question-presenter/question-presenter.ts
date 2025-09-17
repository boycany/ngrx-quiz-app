import { Component, effect, inject } from '@angular/core';
import { QuizStore } from '../../store/quiz.store';

@Component({
  selector: 'app-question-presenter',
  imports: [],
  templateUrl: './question-presenter.html',
  styleUrl: './question-presenter.scss',
})
export class QuestionPresenter {
  readonly store = inject(QuizStore);

  // onSelectAnswer(index: number) {
  //   console.log('selectedindex :>> ', index);
  //   this.store.addAnswer(index);
  /** after ngrx v18, protectedState default set to be true
   * so we cannot use patchState outside of the store definition
   */
  // patchState(this.store, (state) => ({
  //   ...state,
  //   answers: [...state.answers, index],
  // }));
  // }
}
