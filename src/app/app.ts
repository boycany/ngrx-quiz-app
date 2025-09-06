import { Component, inject, signal } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { Quiz } from './features/quiz/quiz';
import { RouterOutlet } from '@angular/router';
import { QuizStore } from './store/quiz.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
