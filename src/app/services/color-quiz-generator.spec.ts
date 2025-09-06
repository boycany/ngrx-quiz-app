import { TestBed } from '@angular/core/testing';

import { ColorQuizGenerator } from './color-quiz-generator';

describe('ColorQuizGenerator', () => {
  let service: ColorQuizGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorQuizGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
