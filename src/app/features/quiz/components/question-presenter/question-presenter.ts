import { Component, signal } from '@angular/core';
import { Question } from '../../../../models/question.model';
import { ColorNamePipe } from '../../../../pipes/color-name-pipe';

@Component({
  selector: 'app-question-presenter',
  imports: [ColorNamePipe],
  templateUrl: './question-presenter.html',
  styleUrl: './question-presenter.scss',
})
export class QuestionPresenter {
  readonly question = signal<Question>({
    caption: ['Red', 'Green'],
    answers: ['Red', 'Green', 'Blue', 'Yellow'],
    correctIndex: 3,
  });
}
