import { PercentPipe } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-done',
  imports: [PercentPipe],
  templateUrl: './done.html',
  styleUrl: './done.scss',
})
export class Done {
  readonly correct = input.required<number>();
  readonly total = input.required<number>();
  readonly score = computed(() => this.correct() / this.total());
  scoreEff = effect(() => console.log('this.score() :>> ', this.score()));
}
