import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed, effect, inject, Signal } from '@angular/core';
import { addAnswer, resetQuestions, resetQuiz, setBusy } from './quiz.updaters';
import { getCorrectCount } from './quiz.helper';
import { AppStore } from '../../../store/app.store';
import {
  translate,
  translateToPair,
  translateToPairs,
} from '../../../store/app.helpers';
import { QUESTION_CAPTION } from '../../../data/dictionaries';
import { ColorQuizGenerator } from '../../../services/color-quiz-generator';
import { exhaustAll, generate, map, switchAll, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Question } from '../../../models/question.model';

export const QuizStore = signalStore(
  // {
  //   providedIn: 'root',
  //   // protectedState: false,
  //   // Default is 'true' to prevent someone from outside modifying the state
  // },
  withState(initialQuizSlice),
  withProps((_) => ({
    _colorQuizGenService: inject(ColorQuizGenerator),
  })),
  withComputed((store) => {
    const appStore = inject(AppStore);
    const dictonary = appStore.selectedDictionary;

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

    const title = computed(() => translate(QUESTION_CAPTION, dictonary()));
    const captionColors = computed(() =>
      translateToPairs(currentQuestion().caption, dictonary()),
    );
    const answerColors = computed(() =>
      translateToPairs(currentQuestion().answers, dictonary()),
    );

    return {
      currentQuestionIndex,
      isDone,
      currentQuestion,
      questionsCount,
      correctCount,
      title,
      captionColors,
      answerColors,
    };
  }),
  withMethods((store) => {
    const generateNewQuiz = rxMethod<void>((trigger$) =>
      trigger$.pipe(
        tap((trigger) => console.log('trigger :>> ', trigger)),
        tap(() => patchState(store, setBusy(true))),
        map(() => store._colorQuizGenService.createRandomQuiz()),
        exhaustAll(), // use exhaustAll to ignore new requests while one is ongoing
        tap((questions) => console.log('questions :>> ', questions)),
        tap((questions: Question[]) =>
          patchState(store, setBusy(false), resetQuestions(questions)),
        ),
      ),
    );

    return {
      addAnswer: (index: number) => patchState(store, addAnswer(index)),
      resetQuiz: () => patchState(store, resetQuiz()),
      generateNewQuiz,
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      console.log('QuizStore initialized');

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

    onDestroy: () => {
      console.log('QuizStore destroyed');
    },
  })),
);
