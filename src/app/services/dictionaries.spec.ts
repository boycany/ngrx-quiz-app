import { TestBed } from '@angular/core/testing';

import { Dictionaries } from './dictionaries';

describe('Dictionaries', () => {
  let service: Dictionaries;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dictionaries);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
