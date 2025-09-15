import { Component, computed, inject } from '@angular/core';
import { Toolbar } from '../../components/toolbar/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Progress } from '../../components/progress/progress';
import { Done } from './components/done/done';
import { JsonPipe } from '@angular/common';
import { QuizStore } from './store/quiz.store';
import { QuestionPresenter } from './components/question-presenter/question-presenter';
import { Flag } from '../../components/flag/flag';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-quiz',
  imports: [
    Toolbar,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    Progress,
    Done,
    // JsonPipe,
    QuestionPresenter,
    Flag,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
  // providers: [QuizStore],
})
export class Quiz {
  private appStore = inject(AppStore);
  selectedLanguage = this.appStore.selectedLanguage;

  private store = inject(QuizStore);

  //progress
  completedCount = this.store.currentQuestionIndex;
  questionsCount = this.store.questionsCount;
  isDone = this.store.isDone;
  correctCount = this.store.correctCount;

  onResetQuiz() {
    this.store.resetQuiz();
  }

  onLanguageChange() {
    this.appStore.changeLanguage();
  }
}
