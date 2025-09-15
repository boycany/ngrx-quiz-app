import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-flag',
  imports: [],
  templateUrl: './flag.html',
  styleUrl: './flag.scss',
})
export class Flag {
  readonly of = input.required<string>();
  readonly imageUrl = computed(() => `images/lang/${this.of()}.svg`);
}
