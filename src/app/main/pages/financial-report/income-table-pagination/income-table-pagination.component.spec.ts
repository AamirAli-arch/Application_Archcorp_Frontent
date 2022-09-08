import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTablePaginationComponent } from './income-table-pagination.component';

describe('IncomeTablePaginationComponent', () => {
  let component: IncomeTablePaginationComponent;
  let fixture: ComponentFixture<IncomeTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeTablePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
