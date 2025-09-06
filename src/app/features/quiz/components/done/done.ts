import { PercentPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-done',
  imports: [PercentPipe],
  templateUrl: './done.html',
  styleUrl: './done.scss',
})
export class Done {
  readonly correct = signal(4);
  readonly total = signal(9);
  readonly score = computed(() => this.correct() / this.total());
  scoreEff = effect(() => console.log('this.score() :>> ', this.score()));
}
