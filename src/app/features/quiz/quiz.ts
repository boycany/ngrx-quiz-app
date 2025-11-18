import { Component, computed, inject } from '@angular/core';
import { Toolbar } from '../../components/toolbar/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Progress } from '../../components/progress/progress';
import { Done } from './components/done/done';
// import { JsonPipe } from '@angular/common';
import { QuizStore } from './store/quiz.store';
import { QuestionPresenter } from './components/question-presenter/question-presenter';
import { Flag } from '../../components/flag/flag';
import { AppStore } from '../../store/app.store';
import { Busy } from '../../components/busy/busy';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [
    Toolbar,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    Progress,
    Done,
    Busy,
    // JsonPipe,
    QuestionPresenter,
    Flag,
    // RouterLink,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
  // providers: [QuizStore],
})
export class Quiz {
  readonly appStore = inject(AppStore);
  readonly store = inject(QuizStore);
  private router = inject(Router);
  // private route = inject(ActivatedRoute);

  navigateToBooksPage() {
    // console.log('this.route :>> ', this.route);
    this.router.navigate(['../books']);
  }
}
