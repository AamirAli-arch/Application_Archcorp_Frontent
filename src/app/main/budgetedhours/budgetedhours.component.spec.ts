import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetedhoursComponent } from './budgetedhours.component';

describe('BudgetedhoursComponent', () => {
  let component: BudgetedhoursComponent;
  let fixture: ComponentFixture<BudgetedhoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetedhoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetedhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
