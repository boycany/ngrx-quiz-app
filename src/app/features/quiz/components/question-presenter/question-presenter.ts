import { Component, effect, inject, signal } from '@angular/core';
import { Question } from '../../../../models/question.model';
import { ColorNamePipe } from '../../../../pipes/color-name-pipe';
import { QuizStore } from '../../../../store/quiz.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-question-presenter',
  imports: [ColorNamePipe],
  templateUrl: './question-presenter.html',
  styleUrl: './question-presenter.scss',
})
export class QuestionPresenter {
  readonly store = inject(QuizStore);
  readonly question = this.store.currentQuestion;
  questionEff = effect(() =>
    console.log('this.question() :>> ', this.question()),
  );

  onSelectAnswer(index: number) {
    console.log('index :>> ', index);
    this.store.addAnswer(index);

    /** after ngrx v18, protectedState default set to be true
     * so we cannot use patchState outside of the store definition
     */
    // patchState(this.store, (state) => ({
    //   ...state,
    //   answers: [...state.answers, index],
    // }));
  }
}
