import { TestBed } from '@angular/core/testing';

import { AssignmentServicesService } from './assignment-services.service';

describe('AssignmentServicesService', () => {
  let service: AssignmentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
