import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTablePaginationComponent } from './expense-table-pagination.component';

describe('ExpenseTablePaginationComponent', () => {
  let component: ExpenseTablePaginationComponent;
  let fixture: ComponentFixture<ExpenseTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseTablePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
