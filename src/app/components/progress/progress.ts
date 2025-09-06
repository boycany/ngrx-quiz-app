import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress',
  imports: [],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class Progress {
  readonly value = input.required<number>();
  readonly max = input.required<number>();
  readonly ratio = computed(() => this.value() / this.max());
}
