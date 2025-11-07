import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-busy',
  imports: [MatProgressSpinnerModule],
  templateUrl: './busy.html',
  styleUrl: './busy.scss',
})
export class Busy {}
