import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';
import { addAnswer, resetQuiz } from './quiz.updaters';

export const QuizStore = signalStore(
  {
    providedIn: 'root',
    // protectedState: false,
    // Default is 'true' to prevent someone from outside modifying the state
  },
  withState(initialQuizSlice),
  withComputed((store) => {
    const currentQuestionIndex = computed(() => store.answers().length);
    const currentQuestion = computed(
      () => store.questions()[currentQuestionIndex()],
    );
    const isDone = computed(
      () => currentQuestionIndex() >= store.questions().length,
    );
    const questionsCount = computed(() => store.questions().length);
    const correctCount = computed(() => {
      return store.answers().reduce((acc, answer, index) => {
        const correctIndex = store.questions()[index].correctIndex;
        return acc + (answer === correctIndex ? 1 : 0);
      }, 0);
    });
    return {
      currentQuestionIndex,
      isDone,
      currentQuestion,
      questionsCount,
      correctCount,
    };
  }),
  withMethods((store) => ({
    addAnswer: (index: number) => patchState(store, addAnswer(index)),
    resetQuiz: () => patchState(store, resetQuiz()),
  })),
);
