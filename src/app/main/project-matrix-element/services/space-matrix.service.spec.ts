import { TestBed } from '@angular/core/testing';

import { SpaceMatrixService } from './space-matrix.service';

describe('SpaceMatrixService', () => {
  let service: SpaceMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
