import { TestBed } from '@angular/core/testing';

import { BudgetedService } from './budgeted.service';

describe('BudgetedService', () => {
  let service: BudgetedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
