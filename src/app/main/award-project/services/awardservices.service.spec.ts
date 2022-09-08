import { TestBed } from '@angular/core/testing';

import { AwardservicesService } from './awardservices.service';

describe('AwardservicesService', () => {
  let service: AwardservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
