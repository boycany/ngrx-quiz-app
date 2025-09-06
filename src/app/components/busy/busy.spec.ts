import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Busy } from './busy';

describe('Busy', () => {
  let component: Busy;
  let fixture: ComponentFixture<Busy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Busy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
