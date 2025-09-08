import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed, effect } from '@angular/core';
import { addAnswer, resetQuiz } from './quiz.updaters';
import { getCorrectCount } from './quiz.helper';

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
    const correctCount = computed(() =>
      getCorrectCount(store.answers(), store.questions()),
    );
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
  withHooks((store) => ({
    onInit: () => {
      const stateJson = localStorage.getItem('quiz');
      if (stateJson) {
        const state = JSON.parse(stateJson);
        patchState(store, state);
      }

      effect(() => {
        const state = getState(store);
        console.log('state :>> ', state);

        const stateJson = JSON.stringify(state);
        localStorage.setItem('quiz', stateJson);
      });
    },
  })),
);
