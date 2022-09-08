import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpectedIncomeComponent } from './add-expected-income.component';

describe('AddExpectedIncomeComponent', () => {
  let component: AddExpectedIncomeComponent;
  let fixture: ComponentFixture<AddExpectedIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpectedIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpectedIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
