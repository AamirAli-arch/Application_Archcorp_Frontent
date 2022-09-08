import { TestBed } from '@angular/core/testing';

import { ExternalUrlGuard } from './external-url.guard';

describe('ExternalUrlGuard', () => {
  let guard: ExternalUrlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExternalUrlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
