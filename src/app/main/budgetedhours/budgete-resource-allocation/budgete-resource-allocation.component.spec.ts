import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgeteResourceAllocationComponent } from './budgete-resource-allocation.component';

describe('BudgeteResourceAllocationComponent', () => {
  let component: BudgeteResourceAllocationComponent;
  let fixture: ComponentFixture<BudgeteResourceAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgeteResourceAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgeteResourceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
