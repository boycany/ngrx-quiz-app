import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPresenter } from './question-presenter';

describe('QuestionPresenter', () => {
  let component: QuestionPresenter;
  let fixture: ComponentFixture<QuestionPresenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPresenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPresenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
