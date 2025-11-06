import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Busy } from './components/busy/busy';
import { AppStore } from './store/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Busy],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly store = inject(AppStore);
}
