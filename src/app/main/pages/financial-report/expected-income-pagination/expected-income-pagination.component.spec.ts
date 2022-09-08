import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedIncomePaginationComponent } from './expected-income-pagination.component';

describe('ExpectedIncomePaginationComponent', () => {
  let component: ExpectedIncomePaginationComponent;
  let fixture: ComponentFixture<ExpectedIncomePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedIncomePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedIncomePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
