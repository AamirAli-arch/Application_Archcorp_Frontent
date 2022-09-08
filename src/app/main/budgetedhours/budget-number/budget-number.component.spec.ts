import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetNumberComponent } from './budget-number.component';

describe('BudgetNumberComponent', () => {
  let component: BudgetNumberComponent;
  let fixture: ComponentFixture<BudgetNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
