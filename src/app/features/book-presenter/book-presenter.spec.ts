import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPresenter } from './book-presenter';

describe('BookPresenter', () => {
  let component: BookPresenter;
  let fixture: ComponentFixture<BookPresenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPresenter],
    }).compileComponents();

    fixture = TestBed.createComponent(BookPresenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
