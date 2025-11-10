import { Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { Question } from '../models/question.model';
import { randomColorQuiz } from './helper';

@Injectable({
  providedIn: 'root',
})
export class ColorQuizGenerator {
  createRandomQuiz(): Observable<Question[]> {
    return of(1).pipe(
      tap(() => console.log('Generating new quiz...')),
      map((_) => randomColorQuiz()),
      delay(2000),
    );
  }
}
