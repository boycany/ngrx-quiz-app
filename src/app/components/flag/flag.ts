import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'app-flag',
  imports: [],
  templateUrl: './flag.html',
  styleUrl: './flag.scss',
})
export class Flag {
  readonly of = input.required<string>();
  ofEff = effect(() => console.log('this.of() :>> ', this.of()));
  readonly imageUrl = computed(() => `images/lang/${this.of()}.svg`);
}
