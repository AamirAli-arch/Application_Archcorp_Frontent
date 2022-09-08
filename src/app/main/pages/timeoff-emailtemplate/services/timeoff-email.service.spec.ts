import { TestBed } from '@angular/core/testing';

import { TimeoffEmailService } from './timeoff-email.service';

describe('TimeoffEmailService', () => {
  let service: TimeoffEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeoffEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
